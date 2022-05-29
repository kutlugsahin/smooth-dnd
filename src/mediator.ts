import * as constants from './constants';
import { defaultOptions } from './defaults';
import dragScroller from './scroller';
import { Axis, DraggableInfo, ElementX, GhostInfo, IContainer, MousePosition, Position, TopLeft, Orientation } from './interfaces';
import './polyfills';
import { addCursorStyleToBody, addStyleToHead, removeStyle } from './styles';
import * as Utils from './utils';
import { ContainerOptions } from './exportTypes';

const grabEvents = ['mousedown', 'touchstart'];
const moveEvents = ['mousemove', 'touchmove'];
const releaseEvents = ['mouseup', 'touchend'];

let dragListeningContainers: IContainer[] = null!;
let grabbedElement: ElementX | null = null;
let ghostInfo: GhostInfo = null!;
let draggableInfo: DraggableInfo = null!;
let containers: IContainer[] = [];
let isDragging = false;
let isCanceling = false;
let dropAnimationStarted = false;
let missedDrag = false;
let handleDrag: (info: DraggableInfo) => boolean = null!;
let handleScroll: (props: { draggableInfo?: DraggableInfo; reset?: boolean }) => void = null!;
let sourceContainerLockAxis: Axis | null = null;
let cursorStyleElement: HTMLStyleElement | null = null;

const containerRectableWatcher = watchRectangles();

const isMobile = Utils.isMobile();

function listenEvents() {
  if (typeof window !== 'undefined') {
    addGrabListeners();
  }
}

function addGrabListeners() {
  grabEvents.forEach(e => {
    window.document.addEventListener(e, onMouseDown as any, { passive: false } as any);
  });
}

function addMoveListeners() {
  moveEvents.forEach(e => {
    window.document.addEventListener(e, onMouseMove as any, { passive: false } as any);
  });
}

function removeMoveListeners() {
  moveEvents.forEach(e => {
    window.document.removeEventListener(e, onMouseMove as any, { passive: false } as any);
  });
}

function addReleaseListeners() {
  releaseEvents.forEach(e => {
    window.document.addEventListener(e, onMouseUp, { passive: false });
  });
}

function removeReleaseListeners() {
  releaseEvents.forEach(e => {
    window.document.removeEventListener(e, onMouseUp as any, { passive: false } as any);
  });
}

function getGhostParent() {
  if (draggableInfo && draggableInfo.ghostParent) {
    return draggableInfo.ghostParent;
  }

  if (grabbedElement) {
    return grabbedElement.parentElement || window.document.body;
  } else {
    return window.document.body;
  }
}

function getGhostElement(wrapperElement: HTMLElement, { x, y }: Position, container: IContainer, cursor: string): GhostInfo {
  const wrapperRect = wrapperElement.getBoundingClientRect();
  const { left, top, right, bottom } = wrapperRect;

  const wrapperVisibleRect = Utils.getIntersection(container.layout.getContainerRectangles().visibleRect, wrapperRect);

  const midX = wrapperVisibleRect.left + (wrapperVisibleRect.right - wrapperVisibleRect.left) / 2;
  const midY = wrapperVisibleRect.top + (wrapperVisibleRect.bottom - wrapperVisibleRect.top) / 2;
  const ghost: HTMLElement = wrapperElement.cloneNode(true) as HTMLElement;
  ghost.style.zIndex = '1000';
  ghost.style.boxSizing = 'border-box';
  ghost.style.position = 'fixed';
  ghost.style.top = '0px';
  ghost.style.left = '0px';
  ghost.style.transform = null;
  ghost.style.removeProperty('transform');

  if (container.shouldUseTransformForGhost()) {
    ghost.style.transform = `translate3d(${left}px, ${top}px, 0)`;
  } else {
    ghost.style.top = `${top}px`;
    ghost.style.left = `${left}px`;
  }

  ghost.style.width = (right - left) + 'px';
  ghost.style.height = (bottom - top) + 'px';
  ghost.style.overflow = 'visible';
  ghost.style.transition = null!;
  ghost.style.removeProperty('transition');
  ghost.style.pointerEvents = 'none';
  ghost.style.userSelect = 'none';

  if (container.getOptions().dragClass) {
    setTimeout(() => {
      Utils.addClass(ghost.firstElementChild as HTMLElement, container.getOptions().dragClass!);
      const dragCursor = window.getComputedStyle(ghost.firstElementChild!).cursor;
      cursorStyleElement = addCursorStyleToBody(dragCursor!);
    });
  } else {
    cursorStyleElement = addCursorStyleToBody(cursor);
  }
  Utils.addClass(ghost, container.getOptions().orientation || 'vertical');
  Utils.addClass(ghost, constants.ghostClass);

  return {
    ghost: ghost,
    centerDelta: { x: midX - x, y: midY - y },
    positionDelta: { left: left - x, top: top - y },
    topLeft: {
      x: left,
      y: top
    }
  };
}

function getDraggableInfo(draggableElement: HTMLElement): DraggableInfo {
  const container = containers.filter(p => draggableElement.parentElement === p.element)[0];
  const draggableIndex = container.draggables.indexOf(draggableElement);
  const getGhostParent = container.getOptions().getGhostParent;
  const draggableRect = draggableElement.getBoundingClientRect();
  return {
    container,
    element: draggableElement,
    size: {
      offsetHeight: draggableRect.bottom - draggableRect.top,
      offsetWidth: draggableRect.right - draggableRect.left,
    },
    elementIndex: draggableIndex,
    payload: container.getOptions().getChildPayload ? container.getOptions().getChildPayload!(draggableIndex) : undefined,
    targetElement: null,
    position: { x: 0, y: 0 },
    groupName: container.getOptions().groupName,
    ghostParent: getGhostParent ? getGhostParent() : null,
    invalidateShadow: null,
    mousePosition: null!,
    relevantContainers: null!
  };
}

function handleDropAnimation(callback: Function) {
  function endDrop() {
    Utils.removeClass(ghostInfo.ghost, 'animated');
    ghostInfo!.ghost.style.transitionDuration = null!;
    getGhostParent().removeChild(ghostInfo.ghost);
    callback();
  }

  function animateGhostToPosition({ top, left }: TopLeft, duration: number, dropClass: string | undefined) {
    Utils.addClass(ghostInfo.ghost, 'animated');
    if (dropClass) {
      Utils.addClass(ghostInfo.ghost.firstElementChild, dropClass);
    }

    ghostInfo.topLeft.x = left;
    ghostInfo.topLeft.y = top;
    translateGhost(duration);
    setTimeout(function () {
      endDrop();
    }, duration + 20);
  }

  function shouldAnimateDrop(options: ContainerOptions) {
    return options.shouldAnimateDrop
      ? options.shouldAnimateDrop(draggableInfo.container.getOptions(), draggableInfo.payload)
      : true;
  }

  function disappearAnimation(duration: number, clb: Function) {
    Utils.addClass(ghostInfo.ghost, 'animated');
    translateGhost(duration, 0.9, true);
    // ghostInfo.ghost.style.transitionDuration = duration + 'ms';
    // ghostInfo.ghost.style.opacity = '0';
    // ghostInfo.ghost.style.transform = 'scale(0.90)';
    setTimeout(function () {
      clb();
    }, duration + 20);
  }

  if (draggableInfo.targetElement) {
    const container = containers.filter(p => p.element === draggableInfo.targetElement)[0];
    if (shouldAnimateDrop(container.getOptions())) {
      const dragResult = container.getDragResult()!;
      animateGhostToPosition(
        dragResult.shadowBeginEnd.rect!,
        Math.max(150, container.getOptions().animationDuration! / 2),
        container.getOptions().dropClass
      );
    } else {
      endDrop();
    }
  } else {
    const container = containers.filter(p => p === draggableInfo.container)[0];
    if (container) {
      const { behaviour, removeOnDropOut } = container.getOptions();
      if ((behaviour === 'move' || behaviour === 'contain') && (isCanceling || !removeOnDropOut) && container.getDragResult()) {
        const rectangles = container.layout.getContainerRectangles();

        // container is hidden somehow
        // move ghost back to last seen position
        if (!Utils.isVisible(rectangles.visibleRect) && Utils.isVisible(rectangles.lastVisibleRect)) {
          animateGhostToPosition(
            {
              top: rectangles.lastVisibleRect.top,
              left: rectangles.lastVisibleRect.left
            },
            container.getOptions().animationDuration!,
            container.getOptions().dropClass
          );
        } else {
          const { removedIndex, elementSize } = container.getDragResult()!;
          const layout = container.layout;
          // drag ghost to back
          container.getTranslateCalculator({
            dragResult: {
              removedIndex,
              addedIndex: removedIndex,
              elementSize,
              pos: undefined!,
              shadowBeginEnd: undefined!,
            },
          });
          const prevDraggableEnd =
            removedIndex! > 0
              ? layout.getBeginEnd(container.draggables[removedIndex! - 1]).end
              : layout.getBeginEndOfContainer().begin;
          animateGhostToPosition(
            layout.getTopLeftOfElementBegin(prevDraggableEnd),
            container.getOptions().animationDuration!,
            container.getOptions().dropClass
          );
        }
      } else {
        disappearAnimation(container.getOptions().animationDuration!, endDrop);
      }
    } else {
      // container is disposed due to removal
      disappearAnimation(defaultOptions.animationDuration!, endDrop);
    }
  }
}

const handleDragStartConditions = (function handleDragStartConditions() {
  let startEvent: { clientX: number; clientY: number };
  let delay: number;
  let clb: Function;
  let timer: any = null!;
  const moveThreshold = 1;
  const maxMoveInDelay = 5;

  function onMove(event: MouseEvent & TouchEvent) {
    const { clientX: currentX, clientY: currentY } = getPointerEvent(event);
    if (!delay) {
      if (Math.abs(startEvent.clientX - currentX) > moveThreshold || Math.abs(startEvent.clientY - currentY) > moveThreshold) {
        return callCallback();
      }
    } else {
      if (Math.abs(startEvent.clientX - currentX) > maxMoveInDelay || Math.abs(startEvent.clientY - currentY) > maxMoveInDelay) {
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

    moveEvents.forEach(e => window.document.addEventListener(e, onMove as any), {
      passive: false,
    });
    releaseEvents.forEach(e => window.document.addEventListener(e, onUp), {
      passive: false,
    });
    window.document.addEventListener('drag', onHTMLDrag, {
      passive: false,
    });
  }

  function deregisterEvent() {
    clearTimeout(timer);
    moveEvents.forEach(e => window.document.removeEventListener(e, onMove as any), {
      passive: false,
    });
    releaseEvents.forEach(e => window.document.removeEventListener(e, onUp), {
      passive: false,
    });
    window.document.removeEventListener('drag', onHTMLDrag, {
      passive: false,
    } as any);
  }

  function callCallback() {
    clearTimeout(timer);
    deregisterEvent();
    clb();
  }

  return function (_startEvent: MouseEvent & TouchEvent, _delay: number, _clb: Function) {
    startEvent = getPointerEvent(_startEvent);
    delay = typeof _delay === 'number' ? _delay : isMobile ? 200 : 0;
    clb = _clb;

    registerEvents();
  };
})();

function onMouseDown(event: MouseEvent & TouchEvent) {
  const e = getPointerEvent(event);
  if (!isDragging && (e.button === undefined || e.button === 0)) {
    grabbedElement = Utils.getParent(e.target as Element, '.' + constants.wrapperClass) as ElementX;
    if (grabbedElement) {
      const containerElement = Utils.getParent(grabbedElement, '.' + constants.containerClass);
      const container = containers.filter(p => p.element === containerElement)[0];
      const dragHandleSelector = container.getOptions().dragHandleSelector;
      const nonDragAreaSelector = container.getOptions().nonDragAreaSelector;

      let startDrag = true;
      if (dragHandleSelector && !Utils.getParent(e.target as Element, dragHandleSelector)) {
        startDrag = false;
      }

      if (nonDragAreaSelector && Utils.getParent(e.target as Element, nonDragAreaSelector)) {
        startDrag = false;
      }

      if (startDrag) {
        container.layout.invalidate();
        Utils.addClass(window.document.body, constants.disbaleTouchActions);
        Utils.addClass(window.document.body, constants.noUserSelectClass);

        const onMouseUp = () => {
          Utils.removeClass(window.document.body, constants.disbaleTouchActions);
          Utils.removeClass(window.document.body, constants.noUserSelectClass);
          window.document.removeEventListener('mouseup', onMouseUp);
        }

        releaseEvents.forEach(e => {
          window.document.addEventListener(e, onMouseUp, { passive: false });
        });
      }

      if (startDrag) {
        handleDragStartConditions(e, container.getOptions().dragBeginDelay!, () => {
          Utils.clearSelection();
          initiateDrag(e, Utils.getElementCursor(event.target as Element)!);
          addMoveListeners();
          addReleaseListeners();
        });
      }
    }
  }
}

function handleMouseMoveForContainer({ clientX, clientY }: MouseEvent & TouchEvent, orientation: Orientation = 'vertical') {
  const beginEnd = draggableInfo.container.layout.getBeginEndOfContainerVisibleRect();
  let mousePos;
  let axis: 'x' | 'y';
  let leftTop: 'left' | 'top';
  let size;

  if (orientation === 'vertical') {
    mousePos = clientY;
    axis = 'y';
    leftTop = 'top';
    size = draggableInfo.size.offsetHeight;
  } else {
    mousePos = clientX;
    axis = 'x';
    leftTop = 'left';
    size = draggableInfo.size.offsetWidth;
  }

  const beginBoundary = beginEnd.begin;
  const endBoundary = beginEnd.end - size;
  const positionInBoundary = Math.max(beginBoundary, Math.min(endBoundary, (mousePos + ghostInfo.positionDelta[leftTop])));

  ghostInfo.topLeft[axis] = positionInBoundary;
  draggableInfo.position[axis] = Math.max(beginEnd.begin, Math.min(beginEnd.end, (mousePos + ghostInfo.centerDelta[axis])));
  draggableInfo.mousePosition[axis] = Math.max(beginEnd.begin, Math.min(beginEnd.end, mousePos));

  if (draggableInfo.position[axis] < (beginEnd.begin + (size / 2))) {
    draggableInfo.position[axis] = beginEnd.begin + 2;
  }

  if (draggableInfo.position[axis] > (beginEnd.end - (size / 2))) {
    draggableInfo.position[axis] = beginEnd.end - 2;
  }
}

function onMouseMove(event: MouseEvent & TouchEvent) {
  event.preventDefault();
  const e = getPointerEvent(event);
  if (!draggableInfo) {
    initiateDrag(e, Utils.getElementCursor(event.target as Element)!);
  } else {
    const containerOptions = draggableInfo.container.getOptions();
    const isContainDrag = containerOptions.behaviour === 'contain';
    if (isContainDrag) {
      handleMouseMoveForContainer(e, containerOptions.orientation);
    } else if (sourceContainerLockAxis) {
      if (sourceContainerLockAxis === 'y') {
        ghostInfo.topLeft.y = e.clientY + ghostInfo.positionDelta.top;
        draggableInfo.position.y = e.clientY + ghostInfo.centerDelta.y;
        draggableInfo.mousePosition.y = e.clientY;
      } else if (sourceContainerLockAxis === 'x') {
        ghostInfo.topLeft.x = e.clientX + ghostInfo.positionDelta.left;
        draggableInfo.position.x = e.clientX + ghostInfo.centerDelta.x;
        draggableInfo.mousePosition.x = e.clientX;
      }
    } else {
      ghostInfo.topLeft.x = e.clientX + ghostInfo.positionDelta.left;
      ghostInfo.topLeft.y = e.clientY + ghostInfo.positionDelta.top;
      draggableInfo.position.x = e.clientX + ghostInfo.centerDelta.x;
      draggableInfo.position.y = e.clientY + ghostInfo.centerDelta.y;
      draggableInfo.mousePosition.x = e.clientX;
      draggableInfo.mousePosition.y = e.clientY;
    }

    translateGhost();

    if (!handleDrag(draggableInfo)) {
      missedDrag = true;
    } else {
      missedDrag = false;
    }

    if (missedDrag) {
      debouncedHandleMissedDragFrame();
    }
  }
}

var debouncedHandleMissedDragFrame = Utils.debounce(handleMissedDragFrame, 20, false);

function handleMissedDragFrame() {
  if (missedDrag) {
    missedDrag = false;
    handleDragImmediate(draggableInfo, dragListeningContainers);
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
    containerRectableWatcher.stop();
    handleMissedDragFrame();
    dropAnimationStarted = true;
    handleDropAnimation(() => {
      isDragging = false; // 
      fireOnDragStartEnd(false);
      const containers = dragListeningContainers || [];

      let containerToCallDrop = containers.shift();
      while (containerToCallDrop !== undefined) {
        containerToCallDrop.handleDrop(draggableInfo);
        containerToCallDrop = containers.shift();
      }

      dragListeningContainers = null!;
      grabbedElement = null;
      ghostInfo = null!;
      draggableInfo = null!;
      sourceContainerLockAxis = null;
      handleDrag = null!;
      dropAnimationStarted = false;
    });
  }
}

function getPointerEvent(e: TouchEvent & MouseEvent): MouseEvent & TouchEvent {
  return e.touches ? e.touches[0] : e as any;
}

function handleDragImmediate(draggableInfo: DraggableInfo, dragListeningContainers: IContainer[]) {
  let containerBoxChanged = false;
  dragListeningContainers.forEach((p: IContainer) => {
    const dragResult = p.handleDrag(draggableInfo)!;
    containerBoxChanged = !!dragResult.containerBoxChanged || false;
    dragResult.containerBoxChanged = false;
  });

  if (containerBoxChanged) {
    containerBoxChanged = false;
    requestAnimationFrame(() => {
      containers.forEach(p => {
        p.layout.invalidateRects();
        p.onTranslated();
      });
    });
  }
}

function dragHandler(dragListeningContainers: IContainer[]): (draggableInfo: DraggableInfo) => boolean {
  let targetContainers = dragListeningContainers;
  let animationFrame: number | null = null;
  return function (draggableInfo: DraggableInfo): boolean {
    if (animationFrame === null && isDragging && !dropAnimationStarted) {
      animationFrame = requestAnimationFrame(() => {
        if (isDragging && !dropAnimationStarted) {
          handleDragImmediate(draggableInfo, targetContainers);
          handleScroll({ draggableInfo });
        }
        animationFrame = null;
      })
      return true;
    }
    return false;
  };
}

function getScrollHandler(container: IContainer, dragListeningContainers: IContainer[]) {
  if (container.getOptions().autoScrollEnabled) {
    return dragScroller(dragListeningContainers, container.getScrollMaxSpeed());
  } else {
    return (props: { draggableInfo?: DraggableInfo; reset?: boolean }) => null;
  }
}

function fireOnDragStartEnd(isStart: boolean) {
  containers.forEach(p => {
    const fn = isStart ? p.getOptions().onDragStart : p.getOptions().onDragEnd;
    if (fn) {
      const options: any = {
        isSource: p === draggableInfo.container,
        payload: draggableInfo.payload,
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

function initiateDrag(position: MousePosition, cursor: string) {
  if (grabbedElement !== null) {
    isDragging = true;
    const container = (containers.filter(p => grabbedElement!.parentElement === p.element)[0]) as IContainer;
    container.setDraggables();
    sourceContainerLockAxis = container.getOptions().lockAxis ? container.getOptions().lockAxis!.toLowerCase() as Axis : null;

    draggableInfo = getDraggableInfo(grabbedElement);
    ghostInfo = getGhostElement(
      grabbedElement,
      { x: position.clientX, y: position.clientY },
      draggableInfo.container,
      cursor
    );
    draggableInfo.position = {
      x: position.clientX + ghostInfo.centerDelta.x,
      y: position.clientY + ghostInfo.centerDelta.y,
    };
    draggableInfo.mousePosition = {
      x: position.clientX,
      y: position.clientY,
    };

    dragListeningContainers = containers.filter(p => p.isDragRelevant(container, draggableInfo.payload));
    draggableInfo.relevantContainers = dragListeningContainers;
    handleDrag = dragHandler(dragListeningContainers);
    if (handleScroll) {
      handleScroll({ reset: true, draggableInfo: undefined! });
    }
    handleScroll = getScrollHandler(container, dragListeningContainers);
    dragListeningContainers.forEach(p => p.prepareDrag(p, dragListeningContainers));
    fireOnDragStartEnd(true);
    handleDrag(draggableInfo);
    getGhostParent().appendChild(ghostInfo.ghost);

    containerRectableWatcher.start();
  }
}

let ghostAnimationFrame: number | null = null;
function translateGhost(translateDuration = 0, scale = 1, fadeOut = false) {
  const { ghost, topLeft: { x, y } } = ghostInfo;
  const useTransform = draggableInfo.container ? draggableInfo.container.shouldUseTransformForGhost() : true;

  let transformString = useTransform ? `translate3d(${x}px,${y}px, 0)` : null;

  if (scale !== 1) {
    transformString = transformString ? `${transformString} scale(${scale})` : `scale(${scale})`;
  }

  if (translateDuration > 0) {
    ghostInfo.ghost.style.transitionDuration = translateDuration + 'ms';
    requestAnimationFrame(() => {
      transformString && (ghost.style.transform = transformString);
      if (!useTransform) {
        ghost.style.left = x + 'px';
        ghost.style.top = y + 'px';
      }
      ghostAnimationFrame = null;
      if (fadeOut) {
        ghost.style.opacity = '0';
      }
    })
    return;
  }

  if (ghostAnimationFrame === null) {
    ghostAnimationFrame = requestAnimationFrame(() => {
      transformString && (ghost.style.transform = transformString);
      if (!useTransform) {
        ghost.style.left = x + 'px';
        ghost.style.top = y + 'px';
      }
      ghostAnimationFrame = null;
      if (fadeOut) {
        ghost.style.opacity = '0';
      }
    });
  }
}

function registerContainer(container: IContainer) {
  containers.push(container);

  if (isDragging && draggableInfo) {
    if (container.isDragRelevant(draggableInfo.container, draggableInfo.payload)) {
      dragListeningContainers.push(container);
      container.prepareDrag(container, dragListeningContainers);

      if (handleScroll) {
        handleScroll({ reset: true, draggableInfo: undefined! });
      }
      handleScroll = getScrollHandler(container, dragListeningContainers);
      handleDrag = dragHandler(dragListeningContainers);
      container.handleDrag(draggableInfo);
    }
  }
}

function unregisterContainer(container: IContainer) {
  containers.splice(containers.indexOf(container), 1);

  if (isDragging && draggableInfo) {
    if (draggableInfo.container === container) {
      container.fireRemoveElement();
    }

    if (draggableInfo.targetElement === container.element) {
      draggableInfo.targetElement = null;
    }

    const indexInDragListeners = dragListeningContainers.indexOf(container);
    if (indexInDragListeners > -1) {
      dragListeningContainers.splice(indexInDragListeners, 1);
      if (handleScroll) {
        handleScroll({ reset: true, draggableInfo: undefined! });
      }
      handleScroll = getScrollHandler(container, dragListeningContainers);
      handleDrag = dragHandler(dragListeningContainers);
    }
  }
}

function watchRectangles() {
  let animationHandle: number | null = null;
  let isStarted = false;
  function _start() {
    animationHandle = requestAnimationFrame(() => {
      dragListeningContainers.forEach(p => p.layout.invalidateRects());
      setTimeout(() => {
        if (animationHandle !== null) _start();
      }, 50);
    });
  }

  function stop() {
    if (animationHandle !== null) {
      cancelAnimationFrame(animationHandle);
      animationHandle = null;
    }
    isStarted = false;
  }

  return {
    start: () => {
      if (!isStarted) {
        isStarted = true;
        _start();
      }
    },
    stop
  }
}

function cancelDrag() {
  if (isDragging && !isCanceling && !dropAnimationStarted) {
    isCanceling = true;
    missedDrag = false;

    const outOfBoundsDraggableInfo: DraggableInfo = Object.assign({}, draggableInfo, {
      targetElement: null,
      position: { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER },
      mousePosition: { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER },
    });

    dragListeningContainers.forEach(container => {
      container.handleDrag(outOfBoundsDraggableInfo);
    });

    draggableInfo.targetElement = null;
    draggableInfo.cancelDrop = true;

    onMouseUp();
    isCanceling = false;
  }
}

function Mediator() {
  listenEvents();
  return {
    register: function (container: IContainer) {
      registerContainer(container);
    },
    unregister: function (container: IContainer) {
      unregisterContainer(container);
    },
    isDragging: function () {
      return isDragging;
    },
    cancelDrag,
  };
}

if (typeof window !== 'undefined') {
  addStyleToHead();
}

export default Mediator();
