import * as Utils from './utils';
import { translationValue, visibilityValue, extraSizeForInsertion, containersInDraggable } from './constants';



const horizontalMap = {
	size: 'offsetWidth',
	distanceToParent: 'offsetLeft',
	translate: 'transform',
	begin: 'left',
	end: 'right',
	dragPosition: 'x',
	scrollSize: 'scrollWidth',
	offsetSize: 'offsetWidth',
	scrollValue: 'scrollLeft',
	scale: 'scaleX',
	setSize: 'width',
	setters: {
		'translate': (val) => `translate3d(${val}px, 0, 0)`
	}
};

const verticalMap = {
	size: 'offsetHeight',
	distanceToParent: 'offsetTop',
	translate: 'transform',
	begin: 'top',
	end: 'bottom',
	dragPosition: 'y',
	scrollSize: 'scrollHeight',
	offsetSize: 'offsetHeight',
	scrollValue: 'scrollTop',
	scale: 'scaleY',
	setSize: 'height',
	setters: {
		'translate': (val) => `translate3d(0,${val}px, 0)`
	}
};

function orientationDependentProps(map) {
	function get(obj, prop) {
		const mappedProp = map[prop];
		return obj[mappedProp || prop];
	}

	function set(obj, prop, value) {
		requestAnimationFrame(() => {
			obj[map[prop]] = map.setters[prop] ? map.setters[prop](value) : value;
		});
	}

	return { get, set };
}

export default function layoutManager(containerElement, orientation, _animationDuration) {
	containerElement[extraSizeForInsertion] = 0;
	const animationDuration = _animationDuration;
	const map = orientation === 'horizontal' ? horizontalMap : verticalMap;
	const propMapper = orientationDependentProps(map);
	const values = {
		translation: 0
	};
	let registeredScrollListener = null;

	global.addEventListener('resize', function() {
		invalidateContainerRectangles(containerElement);
		// invalidateContainerScale(containerElement);
	});

	setTimeout(() => {
		invalidate();
	}, 10);
	// invalidate();

	const scrollListener = Utils.listenScrollParent(containerElement, function() {
		invalidateContainerRectangles(containerElement);
		registeredScrollListener && registeredScrollListener();
	});
	function invalidate() {
		invalidateContainerRectangles(containerElement);
		invalidateContainerScale(containerElement);
	}

	let visibleRect;
	function invalidateContainerRectangles(containerElement) {
		values.rect = Utils.getContainerRect(containerElement);
		values.visibleRect = Utils.getVisibleRect(containerElement, values.rect);
	}

	function invalidateContainerScale(containerElement) {
		const rect = containerElement.getBoundingClientRect();
		values.scaleX = containerElement.offsetWidth ? ((rect.right - rect.left) / containerElement.offsetWidth) : 1;
		values.scaleY = containerElement.offsetHeight ? ((rect.bottom - rect.top) / containerElement.offsetHeight) : 1;
	}

	function getContainerRectangles() {
		return {
			rect: values.rect,
			visibleRect: values.visibleRect
		};
	}

	function getBeginEndOfDOMRect(rect) {
		return {
			begin: propMapper.get(rect, 'begin'),
			end: propMapper.get(rect, 'end')
		};
	}

	function getBeginEndOfContainer() {
		const begin = propMapper.get(values.rect, 'begin') + values.translation;
		const end = propMapper.get(values.rect, 'end') + values.translation;
		return { begin, end };
	}

	function getBeginEndOfContainerVisibleRect() {
		const begin = propMapper.get(values.visibleRect, 'begin') + values.translation;
		const end = propMapper.get(values.visibleRect, 'end') + values.translation;
		return { begin, end };
	}

	function getContainerScale() {
		return { scaleX: values.scaleX, scaleY: values.scaleY };
	}

	function getSize(element) {
		return propMapper.get(element, 'size') * propMapper.get(values, 'scale');
	}

	function getDistanceToOffsetParent(element) {
		const distance = propMapper.get(element, 'distanceToParent') + (element[translationValue] || 0);
		return distance * propMapper.get(values, 'scale');
	}

	function getBeginEnd(element) {
		const begin = getDistanceToOffsetParent(element) + (propMapper.get(values.rect, 'begin') + values.translation) - propMapper.get(containerElement, 'scrollValue');
		return {
			begin,
			end: begin + getSize(element) * propMapper.get(values, 'scale')
		};
	}

	function setSize(element, size) {
		propMapper.set(element, 'setSize', size);
	}

	function getAxisValue(position) {
		return propMapper.get(position, 'dragPosition');
	}

	function updateDescendantContainerRects(container) {
		container.layout.invalidateRects();
		container.onTranslated();
		if (container.getChildContainers()) {
			container.getChildContainers().forEach(p => updateDescendantContainerRects(p));
		}
	}

	function setTranslation(element, translation) {
		if (!translation) {
			element.style.removeProperty('transform');
		} else {
			propMapper.set(element.style, 'translate', translation);
		}
		element[translationValue] = translation;

		if (element[containersInDraggable]) {
			setTimeout(() => {
				element[containersInDraggable].forEach(p => {
					updateDescendantContainerRects(p);
				});
			}, animationDuration + 20);
		}
	}

	function getTranslation(element) {
		return element[translationValue];
	}

	function setVisibility(element, isVisible) {
		if (element[visibilityValue] === undefined || element[visibilityValue] !== isVisible) {
			if (isVisible) {
				element.style.removeProperty('visibility');
			} else {
				element.style.visibility = 'hidden';
			}
			element[visibilityValue] = isVisible;
		}
	}

	function isVisible(element) {
		return element[visibilityValue] === undefined || element[visibilityValue];
	}

	function isInVisibleRect(x, y) {
		let { left, top, right, bottom } = values.visibleRect;

		// if there is no wrapper in rect size will be 0 and wont accept any drop
		// so make sure at least there is 30px difference
		if (bottom - top < 2) {
			bottom = top + 30;
		}
		const containerRect = values.rect;
		if (orientation === 'vertical') {
			return x > containerRect.left && x < containerRect.right && y > top && y < bottom;
		} else {
			return x > left && x < right && y > containerRect.top && y < containerRect.bottom;
		}
	}

	function setScrollListener(callback) {
		registeredScrollListener = callback;
	}

	function getTopLeftOfElementBegin(begin) {
		let top = 0;
		let left = 0;
		if (orientation === 'horizontal') {
			left = begin;
			top = values.rect.top;
		} else {
			left = values.rect.left;
			top = begin;
		}

		return {
			top, left
		};
	}

	function getScrollSize(element) {
		return propMapper.get(element, 'scrollSize');
	}

	function getScrollValue(element) {
		return propMapper.get(element, 'scrollValue');
	}

	function setScrollValue(element, val) {
		return propMapper.set(element, 'scrollValue', val);
	}

	function dispose() {
		if (scrollListener) {
			scrollListener.dispose();
		}

		if (visibleRect) {
			visibleRect.parentNode.removeChild(visibleRect);
			visibleRect = null;
		}
	}

	function getPosition(position) {
		return isInVisibleRect(position.x, position.y) ? getAxisValue(position) : null;
	}

	function invalidateRects() {
		invalidateContainerRectangles(containerElement);
	}

	return {
		getSize,
		//getDistanceToContainerBegining,
		getContainerRectangles,
		getBeginEndOfDOMRect,
		getBeginEndOfContainer,
		getBeginEndOfContainerVisibleRect,
		getBeginEnd,
		getAxisValue,
		setTranslation,
		getTranslation,
		setVisibility,
		isVisible,
		isInVisibleRect,
		dispose,
		getContainerScale,
		setScrollListener,
		setSize,
		getTopLeftOfElementBegin,
		getScrollSize,
		getScrollValue,
		setScrollValue,
		invalidate,
		invalidateRects,
		getPosition,
	};
}