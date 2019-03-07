import { getScrollingAxis, getVisibleRect } from './utils';
import { Axis, ScrolableInfo, Position, IContainer, DraggableInfo } from './interfaces';

const maxSpeed = 1500; // px/s
const minSpeed = 20; // px/s

function addScrollValue(element: HTMLElement | Window, axis: Axis, value: number) {
	if (element) {
		if (element !== window) {
			if (axis === 'x') {
				(element as HTMLElement).scrollLeft += value;
			} else {
				(element as HTMLElement).scrollTop += value;
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

const createAnimator = (element: HTMLElement, axis: Axis = 'y') => {
	let isAnimating = false;
	let request: number | null = null;
	let startTime: number | null = null;
	let direction: 'begin' | 'end' | null = null;
	let speed: number | null = null;

	function animate(_direction: 'begin' | 'end', _speed: number) {
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
				let distanceDiff = (timeDiff / 1000) * speed!;
				distanceDiff = direction === 'begin' ? (0 - distanceDiff) : distanceDiff;
				addScrollValue(element, axis, distanceDiff);
				request = null;
				start();
			});
		}
	}

	function stop() {
		if (isAnimating) {
			cancelAnimationFrame(request!);
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

function getAutoScrollInfo(position: Position, scrollableInfo: ScrolableInfo): {
	direction: 'begin' | 'end',
	speedFactor: number;
} | null {
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

	return null;
}

function scrollableInfo(element: HTMLElement): ScrolableInfo {
  var result: ScrolableInfo = {
    element,
    rect: getVisibleRect(element, element.getBoundingClientRect()),
    descendants: [],
    invalidate,
    axis: 'y',
    dispose,
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

function getScrollableElements(containerElements: HTMLElement[]) {
	const scrollables: ScrolableInfo[] = [];
	let firstDescendentScrollable = null;
	containerElements.forEach(el => {
		let current: HTMLElement | null = el;
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

function getScrollableAnimator(scrollableInfo: ScrolableInfo) {
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

export default (containers: IContainer[]) => {
	const scrollablesInfo = getScrollableElements(containers.map(p => p.element));
	const animators = [...scrollablesInfo.map(getScrollableAnimator), ...getWindowAnimators()];
	return ({ draggableInfo, reset }: { draggableInfo?: DraggableInfo; reset?: boolean}) => {
		if (animators.length) {
			if (reset) {
				animators.forEach(p => p.stop());
				scrollablesInfo.forEach(p => p.dispose());
				return;
			}

			animators.forEach(animator => {
				const scrollParams = getAutoScrollInfo(draggableInfo!.mousePosition, animator as any as ScrolableInfo);
				if (scrollParams) {
					animator.animate(scrollParams.direction, scrollParams.speedFactor * maxSpeed);
				} else {
					animator.stop();
				}
			});
		}
	}
}