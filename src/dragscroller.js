import { isScrolling, getScrollingAxis, getVisibleRect, debounce } from './utils';

const maxSpeed = 1500; // px/s
const minSpeed = 20; // px/s

function addScrollValue(element, axis, value) {
	if (element) {
		if (axis === 'x') {
			element.scrollLeft += value;
		} else {
			element.scrollTop += value;
		}
	}
}

const createAnimator = (element, axis = 'y') => {
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
				addScrollValue(element, axis, distanceDiff);
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

function getAutoScrollInfo(position, scrollableInfo) {
	let begin;
	let end;
	let pos;
	if (scrollableInfo.axis === 'x') {
		begin = scrollableInfo.rect.left;
		end = scrollableInfo.rect.right;
		pos = position.x;
	} else {
		begin = scrollableInfo.rect.top;
		end = scrollableInfo.rect.bottom;
		pos = position.y;
	}
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

function scrollableInfo(element) {
	var result = {
		element,
		rect: element.getBoundingClientRect(),
		descendants: [],
		invalidate,
		axis: null
	};

	function invalidate() {
		result.rect = getVisibleRect(element, element.getBoundingClientRect());
		result.descendants.forEach(p => p.invalidate());
	}

	element.addEventListener('scroll', () => {
		invalidate();
	});

	return result;
}

function getScrollableElements(containerElements) {
	const scrollables = [];
	let deepestScrollable = null;
	containerElements.forEach(el => {
		let current = el;
		deepestScrollable = null;
		while (current) {
			const scrollingAxis = getScrollingAxis(current);
			if (scrollingAxis) {
				if (!scrollables.some(p => p.element === current)) {
					const info = scrollableInfo(current);
					if (deepestScrollable) {
						info.descendants.push(deepestScrollable);
					}
					deepestScrollable = info;
					if (scrollingAxis === 'xy') {
						scrollables.push(Object.assign({}, info, { axis: 'x' }));
						scrollables.push(Object.assign({}, info, { axis: 'y' }));
					} else {
						scrollables.push(Object.assign({}, info, { axis: scrollingAxis }));
					}
				}
			}
			current = current.parentElement;
		}
	});
	return scrollables;
}

function getScrollableAnimator(scrollableInfo) {
	return Object.assign(scrollableInfo, createAnimator(scrollableInfo.element, scrollableInfo.axis));
}

export default (containers) => {
	const scrollablesInfo = getScrollableElements(containers.map(p => p.element));
	const animators = scrollablesInfo.map(getScrollableAnimator);
	return ({ draggableInfo, reset }) => {
		if (animators && animators.length) {
			if (reset) {
				animators.forEach(p => p.stop());
				return null;
			}

			animators.forEach(animator => {
				const scrollParams = getAutoScrollInfo(draggableInfo.mousePosition, animator);
				if (scrollParams) {
					animator.animate(scrollParams.direction, scrollParams.speedFactor * maxSpeed);
				} else {
					animator.stop();
				}
			});
		}
	}
	return null;
}