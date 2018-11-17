import './polyfills';
import * as Utils from './utils';
import * as constants from './constants';
import { addStyleToHead, addCursorStyleToBody, removeStyle } from './styles';
import dragScroller from './dragscroller';

const grabEvents = ['mousedown', 'touchstart'];
const moveEvents = ['mousemove', 'touchmove'];
const releaseEvents = ['mouseup', 'touchend'];

let dragListeningContainers = null;
let grabbedElement = null;
let ghostInfo = null;
let draggableInfo = null;
let containers = [];
let isDragging = false;
let removedElement = null;

let handleDrag = null;
let handleScroll = null;
let sourceContainer = null;
let sourceContainerLockAxis = null;
let cursorStyleElement = null;

// Utils.addClass(document.body, 'clearfix');

const isMobile = Utils.isMobile();

function listenEvents() {
  if (typeof window !== 'undefined') {
    addGrabListeners();
  }
}

function addGrabListeners() {
  grabEvents.forEach(e => {
    global.document.addEventListener(e, onMouseDown, { passive: false });
  });
}

function addMoveListeners() {
  moveEvents.forEach(e => {
    global.document.addEventListener(e, onMouseMove, { passive: false });
  });
}

function removeMoveListeners() {
  moveEvents.forEach(e => {
    global.document.removeEventListener(e, onMouseMove, { passive: false });
  });
}

function addReleaseListeners() {
  releaseEvents.forEach(e => {
    global.document.addEventListener(e, onMouseUp, { passive: false });
  });
}

function removeReleaseListeners() {
  releaseEvents.forEach(e => {
    global.document.removeEventListener(e, onMouseUp, { passive: false });
  });
}

function getGhostParent() {
  if (draggableInfo.ghostParent) {
    return draggableInfo.ghostParent;
  }

  if (grabbedElement) {
    return grabbedElement.parentElement || global.document.body;
  } else {
    return global.document.body;
  }
}

function getGhostElement(wrapperElement, { x, y }, container, cursor) {
  const { scaleX = 1, scaleY = 1 } = container.getScale();
  const { left, top, right, bottom } = wrapperElement.getBoundingClientRect();
  const midX = left + (right - left) / 2;
  const midY = top + (bottom - top) / 2;
  const ghost = wrapperElement.cloneNode(true);
  ghost.style.zIndex = 1000;
  ghost.style.boxSizing = 'border-box';
  ghost.style.position = 'fixed';
  ghost.style.left = left + 'px';
  ghost.style.top = top + 'px';
  ghost.style.width = right - left + 'px';
  ghost.style.height = bottom - top + 'px';
  ghost.style.overflow = 'visible';
  ghost.style.transition = null;
  ghost.style.removeProperty('transition');
  ghost.style.pointerEvents = 'none';

  if (container.getOptions().dragClass) {
    setTimeout(() => {
      Utils.addClass(ghost.firstElementChild, container.getOptions().dragClass);
      const dragCursor = global.getComputedStyle(ghost.firstElementChild).cursor;
      cursorStyleElement = addCursorStyleToBody(dragCursor);
    });
  } else {
    cursorStyleElement = addCursorStyleToBody(cursor);
  }
  Utils.addClass(ghost, container.getOptions().orientation);
  Utils.addClass(ghost, constants.ghostClass);

  return {
    ghost: ghost,
    centerDelta: { x: midX - x, y: midY - y },
    positionDelta: { left: left - x, top: top - y }
  };
}

function getDraggableInfo(draggableElement) {
  const container = containers.filter(p => draggableElement.parentElement === p.element)[0];
  const draggableIndex = container.draggables.indexOf(draggableElement);
  const getGhostParent = container.getOptions().getGhostParent;
  return {
    container,
    element: draggableElement,
    elementIndex: draggableIndex,
    payload: container.getOptions().getChildPayload
      ? container.getOptions().getChildPayload(draggableIndex)
      : undefined,
    targetElement: null,
    position: { x: 0, y: 0 },
    groupName: container.getOptions().groupName,
    ghostParent: getGhostParent ? getGhostParent() : null,
  };
}

function handleDropAnimation(callback) {
  function endDrop() {
    Utils.removeClass(ghostInfo.ghost, 'animated');
    ghostInfo.ghost.style.transitionDuration = null;
    getGhostParent().removeChild(ghostInfo.ghost);
    callback();
  }

  function animateGhostToPosition({ top, left }, duration, dropClass) {
    Utils.addClass(ghostInfo.ghost, 'animated');
    if (dropClass) {
      Utils.addClass(ghostInfo.ghost.firstElementChild, dropClass);
    }
    ghostInfo.ghost.style.transitionDuration = duration + 'ms';
    ghostInfo.ghost.style.left = left + 'px';
    ghostInfo.ghost.style.top = top + 'px';
    setTimeout(function() {
      endDrop();
    }, duration + 20);
  }

  function shouldAnimateDrop(options) {
    return options.shouldAnimateDrop
      ? options.shouldAnimateDrop(draggableInfo.container.getOptions(), draggableInfo.payload)
      : true;
  }

  if (draggableInfo.targetElement) {
    const container = containers.filter(p => p.element === draggableInfo.targetElement)[0];
    if (shouldAnimateDrop(container.getOptions())) {
      const dragResult = container.getDragResult();
      animateGhostToPosition(
        dragResult.shadowBeginEnd.rect,
        Math.max(150, container.getOptions().animationDuration / 2),
        container.getOptions().dropClass
      );
    } else {
      endDrop();
    }
  } else {
    const container = containers.filter(p => p === draggableInfo.container)[0];
    const { behaviour, removeOnDropOut } = container.getOptions();
    if (behaviour === 'move' && !removeOnDropOut && container.getDragResult()) {
      const { removedIndex, elementSize } = container.getDragResult();
      const layout = container.layout;
      // drag ghost to back
      container.getTranslateCalculator({
        dragResult: {
          removedIndex,
          addedIndex: removedIndex,
          elementSize
        }
      });
      const prevDraggableEnd =
        removedIndex > 0
          ? layout.getBeginEnd(container.draggables[removedIndex - 1]).end
          : layout.getBeginEndOfContainer().begin;
      animateGhostToPosition(
        layout.getTopLeftOfElementBegin(prevDraggableEnd),
        container.getOptions().animationDuration,
        container.getOptions().dropClass
      );
    } else {
      Utils.addClass(ghostInfo.ghost, 'animated');
      ghostInfo.ghost.style.transitionDuration = container.getOptions().animationDuration + 'ms';
      ghostInfo.ghost.style.opacity = '0';
      ghostInfo.ghost.style.transform = 'scale(0.90)';
      setTimeout(function() {
        endDrop();
      }, container.getOptions().animationDuration);
    }
  }
}

const handleDragStartConditions = (function handleDragStartConditions() {
  let startEvent;
  let delay;
  let clb;
  let timer = null;
  const moveThreshold = 1;
  const maxMoveInDelay = 5;

  function onMove(event) {
    const { clientX: currentX, clientY: currentY } = getPointerEvent(event);
    if (!delay) {
      if (
        Math.abs(startEvent.clientX - currentX) > moveThreshold ||
        Math.abs(startEvent.clientY - currentY) > moveThreshold
      ) {
        return callCallback();
      }
    } else {
      if (
        Math.abs(startEvent.clientX - currentX) > maxMoveInDelay ||
        Math.abs(startEvent.clientY - currentY) > maxMoveInDelay
      ) {
        deregisterEvent();
      }
    }
  }

  function onUp() {
    deregisterEvent();
  }
  function onHTMLDrag() {
    deregisterEvent();
  }

  function registerEvents() {
    if (delay) {
      timer = setTimeout(callCallback, delay);
    }

    moveEvents.forEach(e => global.document.addEventListener(e, onMove), {
      passive: false
    });
    releaseEvents.forEach(e => global.document.addEventListener(e, onUp), {
      passive: false
    });
    global.document.addEventListener('drag', onHTMLDrag, {
      passive: false
    });
  }

  function deregisterEvent() {
    clearTimeout(timer);
    moveEvents.forEach(e => global.document.removeEventListener(e, onMove), {
      passive: false
    });
    releaseEvents.forEach(e => global.document.removeEventListener(e, onUp), {
      passive: false
    });
    global.document.removeEventListener('drag', onHTMLDrag, {
      passive: false
    });
  }

  function callCallback() {
    clearTimeout(timer);
    deregisterEvent();
    clb();
  }

  return function(_startEvent, _delay, _clb) {
    startEvent = getPointerEvent(_startEvent);
    delay = (typeof _delay === 'number') ? _delay : (isMobile ? 200 : 0);
    clb = _clb;

    registerEvents();
  };
})();

function onMouseDown(event) {
  const e = getPointerEvent(event);
  if (!isDragging && (e.button === undefined || e.button === 0)) {
    grabbedElement = Utils.getParent(e.target, '.' + constants.wrapperClass);
    if (grabbedElement) {
      const containerElement = Utils.getParent(grabbedElement, '.' + constants.containerClass);
      const container = containers.filter(p => p.element === containerElement)[0];
      const dragHandleSelector = container.getOptions().dragHandleSelector;
      const nonDragAreaSelector = container.getOptions().nonDragAreaSelector;

      let startDrag = true;
      if (dragHandleSelector && !Utils.getParent(e.target, dragHandleSelector)) {
        startDrag = false;
      }

      if (nonDragAreaSelector && Utils.getParent(e.target, nonDragAreaSelector)) {
        startDrag = false;
      }

      if (startDrag) {
        handleDragStartConditions(e, container.getOptions().dragBeginDelay, () => {
          Utils.clearSelection();
          initiateDrag(e, Utils.getElementCursor(event.target));
          addMoveListeners();
          addReleaseListeners();
        });
      }
    }
  }
}

function onMouseUp() {
  removeMoveListeners();
  removeReleaseListeners();
  handleScroll({ reset: true });
  if (cursorStyleElement) {
    removeStyle(cursorStyleElement);
    cursorStyleElement = null;
  }
  if (draggableInfo) {
    handleDropAnimation(() => {
      Utils.removeClass(global.document.body, constants.disbaleTouchActions);
      Utils.removeClass(global.document.body, constants.noUserSelectClass);
      fireOnDragStartEnd(false);
      (dragListeningContainers || []).forEach(p => {
        p.handleDrop(draggableInfo);
      });

      dragListeningContainers = null;
      grabbedElement = null;
      ghostInfo = null;
      draggableInfo = null;
      isDragging = false;
      sourceContainer = null;
      sourceContainerLockAxis = null;
      handleDrag = null;
    });
  }
}

function getPointerEvent(e) {
  return e.touches ? e.touches[0] : e;
}

function dragHandler(dragListeningContainers) {
  let targetContainers = dragListeningContainers;
  return function(draggableInfo) {
    let containerBoxChanged = false;
    targetContainers.forEach(p => {
      const dragResult = p.handleDrag(draggableInfo);
      containerBoxChanged |= dragResult.containerBoxChanged || false;
      dragResult.containerBoxChanged = false;
    });
    handleScroll({ draggableInfo });

    if (containerBoxChanged) {
      containerBoxChanged = false;
      setTimeout(() => {
        containers.forEach(p => {
          p.layout.invalidateRects();
          p.onTranslated();
        });
      }, 10);
    }
  };
}

function getScrollHandler(container, dragListeningContainers) {
  if (container.getOptions().autoScrollEnabled) {
    return dragScroller(dragListeningContainers);
  } else {
    return () => null;
  }
}

function fireOnDragStartEnd(isStart) {
  containers.forEach(p => {
    const fn = isStart ? p.getOptions().onDragStart : p.getOptions().onDragEnd;
    if (fn) {
      const options = {
        isSource: p === draggableInfo.container,
        payload: draggableInfo.payload
      };
      if (p.isDragRelevant(draggableInfo.container, draggableInfo.payload)) {
        options.willAcceptDrop = true;
      } else {
        options.willAcceptDrop = false;
      }
      fn(options);
    }
  });
}

function initiateDrag(position, cursor) {
  isDragging = true;
  const container = containers.filter(p => grabbedElement.parentElement === p.element)[0];
  container.setDraggables();
  sourceContainer = container;
  sourceContainerLockAxis = container.getOptions().lockAxis ? container.getOptions().lockAxis.toLowerCase() : null;

  draggableInfo = getDraggableInfo(grabbedElement);
  ghostInfo = getGhostElement(
    grabbedElement,
    { x: position.clientX, y: position.clientY },
    draggableInfo.container,
    cursor
  );
  draggableInfo.position = {
    x: position.clientX + ghostInfo.centerDelta.x,
    y: position.clientY + ghostInfo.centerDelta.y
  };
  draggableInfo.mousePosition = {
    x: position.clientX,
    y: position.clientY
  };

  Utils.addClass(global.document.body, constants.disbaleTouchActions);
  Utils.addClass(global.document.body, constants.noUserSelectClass);

  dragListeningContainers = containers.filter(p => p.isDragRelevant(container, draggableInfo.payload));
  handleDrag = dragHandler(dragListeningContainers);
  if (handleScroll) {
    handleScroll({ reset: true });
  }
  handleScroll = getScrollHandler(container, dragListeningContainers);
  dragListeningContainers.forEach(p => p.prepareDrag(p, dragListeningContainers));
  fireOnDragStartEnd(true);
  handleDrag(draggableInfo);
  getGhostParent().appendChild(ghostInfo.ghost);
}

function onMouseMove(event) {
  event.preventDefault();
  const e = getPointerEvent(event);
  if (!draggableInfo) {
    initiateDrag(e, Utils.getElementCursor(event.target));
  } else {
    // just update ghost position && draggableInfo position
    if (sourceContainerLockAxis) {
      if (sourceContainerLockAxis === 'y') {
        ghostInfo.ghost.style.top = `${e.clientY + ghostInfo.positionDelta.top}px`;
        draggableInfo.position.y = e.clientY + ghostInfo.centerDelta.y;
        draggableInfo.mousePosition.y = e.clientY;
      } else if (sourceContainerLockAxis === 'x') {
        ghostInfo.ghost.style.left = `${e.clientX + ghostInfo.positionDelta.left}px`;
        draggableInfo.position.x = e.clientX + ghostInfo.centerDelta.x;
        draggableInfo.mousePosition.x = e.clientX;
      }
    } else {
      ghostInfo.ghost.style.left = `${e.clientX + ghostInfo.positionDelta.left}px`;
      ghostInfo.ghost.style.top = `${e.clientY + ghostInfo.positionDelta.top}px`;
      draggableInfo.position.x = e.clientX + ghostInfo.centerDelta.x;
      draggableInfo.position.y = e.clientY + ghostInfo.centerDelta.y;
      draggableInfo.mousePosition.x = e.clientX;
      draggableInfo.mousePosition.y = e.clientY;
    }

    handleDrag(draggableInfo);
  }
}

function Mediator() {
  listenEvents();
  return {
    register: function(container) {
      containers.push(container);
    },
    unregister: function(container) {
      containers.splice(containers.indexOf(container), 1);
    }
  };
}

addStyleToHead();

export default Mediator();
