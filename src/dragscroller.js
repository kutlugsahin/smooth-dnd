import { isScrolling, getScrollingAxis, getVisibleRect, debounce } from './utils';

const maxSpeed = 1500; // px/s
const minSpeed = 20; // px/s

function addScrollValue(element, axis, value) {
	if (element) {
		if (element !== window) {
			if (axis === 'x') {
				element.scrollLeft += value;
			} else {
				element.scrollTop += value;
			}
		} else {
			if (axis === 'x') {
				element.scrollBy(value, 0);
			} else {
				element.scrollBy(0, value);
			}
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
	const { left, right, top, bottom } = scrollableInfo.rect;
	const { x, y } = position;
	if (x < left || x > right || y < top || y > bottom) {
		return null;
	}

	let begin;
	let end;
	let pos;
	if (scrollableInfo.axis === 'x') {
		begin = left;
		end = right;
		pos = x;
	} else {
		begin = top;
		end = bottom;
		pos = y;
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
		rect: getVisibleRect(element, element.getBoundingClientRect()),
		descendants: [],
		invalidate,
		axis: null,
		dispose
	};

	function dispose() {
		element.removeEventListener('scroll', invalidate);
	}

	function invalidate() {
		result.rect = getVisibleRect(element, element.getBoundingClientRect());
		result.descendants.forEach(p => p.invalidate());
	}

	element.addEventListener('scroll', invalidate);

	return result;
}

function getScrollableElements(containerElements) {
	const scrollables = [];
	let firstDescendentScrollable = null;
	containerElements.forEach(el => {
		let current = el;
		firstDescendentScrollable = null;
		while (current) {
			const scrollingAxis = getScrollingAxis(current);
			if (scrollingAxis) {
				if (!scrollables.some(p => p.element === current)) {
					const info = scrollableInfo(current);
					if (firstDescendentScrollable) {
						info.descendants.push(firstDescendentScrollable);
					}
					firstDescendentScrollable = info;
					if (scrollingAxis === 'xy') {
						scrollables.push(Object.assign({}, info, { axis: 'x' }));
						scrollables.push(Object.assign({}, info, { axis: 'y' }, { descendants: [] }));
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

function getWindowAnimators() {
	function getWindowRect() {
		return {
			left: 0, right: global.innerWidth, top: 0, bottom: global.innerHeight
		}
	}

	return [
		Object.assign({ rect: getWindowRect(), axis: 'y' }, createAnimator(global)),
		Object.assign({ rect: getWindowRect(), axis: 'x' }, createAnimator(global, 'x'))
	]
}

export default (containers) => {
	const scrollablesInfo = getScrollableElements(containers.map(p => p.element));
	const animators = [...scrollablesInfo.map(getScrollableAnimator), ...getWindowAnimators()];
	return ({ draggableInfo, reset }) => {
		if (animators.length) {
			if (reset) {
				animators.forEach(p => p.stop());
				scrollablesInfo.forEach(p => p.dispose());
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