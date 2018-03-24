import { isScrolling } from './utils';

const maxSpeed = 1500; // px/s
const minSpeed = 20; // px/s

function getScrollableParent(element, axis) {
	let current = element;
	while (current) {
		if (isScrolling(current)) {
			return current;
		}
		current = current.parentElement;
	}
}

function requestFrame(element, layout) {
	let isAnimating = false;
	let request = null;
	let startTime = null;
	let direction = null;
	let speed = null;

	function animate(_direction, _speed) {
		direction = _direction;
		speed = _speed;
		isAnimating = true;
		if (isAnimating) {
			start();
		}
	}

	function start() {
		if (request === null) {
			request = requestAnimationFrame((timestamp) => {
				if (startTime === null) { startTime = timestamp; }
				const timeDiff = timestamp - startTime;
				startTime = timestamp;
				let distanceDiff = (timeDiff / 1000) * speed;
				distanceDiff = direction === 'begin' ? (0 - distanceDiff) : distanceDiff;
				const scrollTo = layout.getScrollValue(element) + distanceDiff;
				layout.setScrollValue(element, scrollTo);
				// console.log(scrollTo);
				request = null;
				start();
			});
		}
	}

	function stop() {
		if (isAnimating) {
			cancelAnimationFrame(request);
			isAnimating = false;
			startTime = null;
			request = null;
		}
	}

	return {
		animate,
		stop
	};
}


function getAutoScrollInfo(pos, elementSize, scrollableBeginEnd) {
	const { begin, end } = scrollableBeginEnd;
	const moveDistance = 100;
	if (end - pos < moveDistance) {
		return {
			direction: 'end',
			speedFactor: (moveDistance - (end - pos)) / moveDistance
		};
	} else if (pos - begin < moveDistance) {
		// console.log(pos - begin);
		return {
			direction: 'begin',
			speedFactor: (moveDistance - (pos - begin)) / moveDistance
		};
	}
}


export default ({ element, layout, options }) => {
	let lastPos = null;
	const axis = options.orientation === 'vertical' ? 'Y' : 'X';
	let scrollableParent = getScrollableParent(element, axis);
	const scrollParentBeginEnd = scrollableParent ? layout.getBeginEndOfDOMRect(scrollableParent.getBoundingClientRect()) : null;
	let animator = requestFrame(element, layout);
	return ({ draggableInfo, dragResult, reset }) => {
		if (options.autoScrollEnabled && scrollableParent) {
			if (reset) {
				animator.stop();
				return null;
			}
			if (dragResult.pos !== null) {
				if (lastPos === null) {
					scrollableParent = getScrollableParent(element, axis);
					animator.stop();
					animator = requestFrame(scrollableParent, layout);
				}
				const autoScrollInfo = getAutoScrollInfo(dragResult.pos, dragResult.elementSize, scrollParentBeginEnd);
				if (autoScrollInfo) {
					animator.animate(autoScrollInfo.direction, autoScrollInfo.speedFactor * maxSpeed);
				} else {
					animator.stop();
				}
				lastPos = dragResult.pos;
			} else {
				animator.stop();
			}

			lastPos = dragResult.pos;
		}
		return null;
	};
};