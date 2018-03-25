import * as Utils from './utils';
import * as constants from './constants';
import { addStyleToHead } from './styles';

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

// Utils.addClass(document.body, 'clearfix');

const isMobile = Utils.isMobile();

function listenEvents() {
	addGrabListeners();
}

function addGrabListeners() {
	grabEvents.forEach(e => {
		window.document.addEventListener(e, onMouseDown, {passive: false});
	});
}

function addMoveListeners() {
	moveEvents.forEach(e => {
		window.document.addEventListener(e, onMouseMove, { passive: false });
	});
}

function removeMoveListeners() {
	moveEvents.forEach(e => {
		window.document.removeEventListener(e, onMouseMove, { passive: false });
	});
}

function addReleaseListeners() {
	releaseEvents.forEach(e => {
		window.document.addEventListener(e, onMouseUp, { passive: false });
	});
}

function removeReleaseListeners() {
	releaseEvents.forEach(e => {
		window.document.removeEventListener(e, onMouseUp, { passive: false });
	});
}

function getGhostElement(element, { x, y }, container) {
	const { scaleX = 1, scaleY = 1 } = container.getScale();
	const { left, top, right, bottom } = element.getBoundingClientRect();	
	const midX = left + ((right - left) / 2);
	const midY = top + ((bottom - top) / 2);
	const div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.pointerEvents = 'none';
	div.style.left = left + 'px';
	div.style.top = top + 'px';
	div.style.width = right - left + 'px';
	div.style.height = bottom - top + 'px';
	div.style.overflow = 'hidden';
	div.className = constants.ghostClass;
	const clone = element.cloneNode(true);
	if (container.getOptions().dragClass) {
		Utils.addClass(clone.childNodes[0], container.getOptions().dragClass);
	}
	clone.style.width = ((right - left) / scaleX) + 'px';
	clone.style.height = ((bottom - top) / scaleY) + 'px';
	clone.style.transform = `scale3d(${scaleX || 1}, ${scaleY || 1}, 1)`;
	clone.style.transformOrigin = '0 0 0';
	clone.style.margin = '0px';
	div.appendChild(clone);

	return {
		ghost: div,
		centerDelta: { x: midX - x, y: midY - y },
		positionDelta: { left: left - x, top: top - y },
		clientWidth: right - left,
		clientHeight: bottom - top
	};
}

function getDraggableInfo(draggableElement) {
	const container = containers.filter(p => draggableElement.parentElement === p.element)[0];
	const draggableIndex = container.draggables.indexOf(draggableElement);
	return {
		container,
		element: draggableElement,
		elementIndex: draggableIndex,
		payload: container.getChildPayload(draggableIndex),
		targetElement: null,
		position: { x: 0, y: 0 },
		groupName: container.groupName
	};
}

function handleDropAnimation(callback) {
	function endDrop() {
		Utils.removeClass(ghostInfo.ghost, 'animated');
		ghostInfo.ghost.style.transitionDuration = null;
		document.body.removeChild(ghostInfo.ghost);
		callback();
	}

	function animateGhostToPosition({ top, left }, duration) {
		Utils.addClass(ghostInfo.ghost, 'animated');
		ghostInfo.ghost.style.transitionDuration = duration + 'ms';
		ghostInfo.ghost.style.left = left + 'px';
		ghostInfo.ghost.style.top = top + 'px';
		setTimeout(function() {
			endDrop();
		}, duration + 10);
	}

	if (draggableInfo.targetElement) {
		const container = containers.filter(p => p.element === draggableInfo.targetElement)[0];
		if (container.shouldAnimateDrop()) {
			const dragResult = container.getDragResult();
			animateGhostToPosition(dragResult.shadowBeginEnd.rect, Math.max(150, container.getOptions().animationDuration / 2));
		} else {
			endDrop();
		}
	} else {
		const container = containers.filter(p => p === draggableInfo.container)[0];
		if (container.getOptions().behaviour === 'move') {
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
			const prevDraggableEnd = removedIndex > 0 ? layout.getBeginEnd(container.draggables[removedIndex - 1]).end : layout.getBeginEndOfContainer().begin;
			animateGhostToPosition(layout.getTopLeftOfElementBegin(prevDraggableEnd), container.getOptions().animationDuration);
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
	const maxMoveInDelay = 8;

	function onMove(event) {
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

	function onUp() { deregisterEvent(); }
	function onHTMLDrag() { deregisterEvent(); }

	function registerEvents() {
		if (delay) {
			timer = setTimeout(callCallback, delay);
		}

		moveEvents.forEach(e => window.document.addEventListener(e, onMove), { passive: false });
		releaseEvents.forEach(e => window.document.addEventListener(e, onUp), { passive: false });
		document.addEventListener('drag', onHTMLDrag, { passive: false });
	}

	function deregisterEvent() {
		clearTimeout(timer);
		moveEvents.forEach(e => window.document.removeEventListener(e, onMove), { passive: false });
		releaseEvents.forEach(e => window.document.removeEventListener(e, onUp), { passive: false });
		document.removeEventListener('drag', onHTMLDrag, { passive: false });
	}

	function callCallback() {
		clearTimeout(timer);
		deregisterEvent();
		clb();
	}

	return function(_startEvent, _delay, _clb) {
		startEvent = getPointerEvent(_startEvent);
		delay = _delay || (isMobile ? 200 : 0);
		clb = _clb;

		registerEvents();
	};
})();

function onMouseDown(event) {
	const e = getPointerEvent(event);
	if (!isDragging) {
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
				event.preventDefault();
				handleDragStartConditions(e, container.getOptions().dragBeginDelay, () => {	
					setTimeout(() => {
						window.getSelection().empty();
					}, 0);
					initiateDrag(e);
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
	if (draggableInfo) {
		handleDropAnimation(() => {
			document.body.style.touchAction = null;
			(dragListeningContainers || []).forEach(p => {
				Utils.removeClass(p.element, constants.noUserSelectClass);
				 p.handleDrop(draggableInfo);
			});

			dragListeningContainers = null;
			grabbedElement = null;
			ghostInfo = null;
			draggableInfo = null;
			isDragging = false;
		});
	}
}

function getPointerEvent(e) {
	return e.touches ? e.touches[0] : e;	
}

function initiateDrag(position) {
	isDragging = true;
	const container = containers.filter(p => grabbedElement.parentElement === p.element)[0];
	container.setDraggables();
	
	draggableInfo = getDraggableInfo(grabbedElement);
	ghostInfo = getGhostElement(grabbedElement, { x: position.clientX, y: position.clientY }, draggableInfo.container);
	draggableInfo.position = {
		x: position.clientX + ghostInfo.centerDelta.x,
		y: position.clientY + ghostInfo.centerDelta.y
	};

	document.body.appendChild(ghostInfo.ghost);


	dragListeningContainers = containers.filter(p => p.isDragRelevant(container, draggableInfo.payload));
	dragListeningContainers.forEach(p => Utils.addClass(p.element, constants.noUserSelectClass));
	dragListeningContainers.forEach(p => p.prepareDrag(p, dragListeningContainers));
	dragListeningContainers.forEach(p => p.handleDrag(draggableInfo));	
}

function onMouseMove(event) {
	event.preventDefault();
	const e = getPointerEvent(event);
	if (!draggableInfo) {
		initiateDrag(e);
	} else {
		// just update ghost position && draggableInfo position
		ghostInfo.ghost.style.left = `${e.clientX + ghostInfo.positionDelta.left}px`;
		ghostInfo.ghost.style.top = `${e.clientY + ghostInfo.positionDelta.top}px`;
		draggableInfo.position.x = e.clientX + ghostInfo.centerDelta.x;
		draggableInfo.position.y = e.clientY + ghostInfo.centerDelta.y;
		draggableInfo.clientWidth = ghostInfo.clientWidth;
		draggableInfo.clientHeight = ghostInfo.clientHeight;
		dragListeningContainers.forEach(p => p.handleDrag(draggableInfo));
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



