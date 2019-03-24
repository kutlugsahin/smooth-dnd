import { Rect, Axis, ElementX, ScrollAxis, IContainer } from './interfaces';
import { containerInstance } from './constants';

export const getIntersection = (rect1: Rect, rect2: Rect) => {
  return {
    left: Math.max(rect1.left, rect2.left),
    top: Math.max(rect1.top, rect2.top),
    right: Math.min(rect1.right, rect2.right),
    bottom: Math.min(rect1.bottom, rect2.bottom),
  };
};

export const getIntersectionOnAxis = (rect1: Rect, rect2: Rect, axis: Axis) => {
  if (axis === 'x') {
    return {
      left: Math.max(rect1.left, rect2.left),
      top: rect1.top,
      right: Math.min(rect1.right, rect2.right),
      bottom: rect1.bottom,
    };
  } else {
    return {
      left: rect1.left,
      top: Math.max(rect1.top, rect2.top),
      right: rect1.right,
      bottom: Math.min(rect1.bottom, rect2.bottom),
    };
  }
};

export const getContainerRect = (element: HTMLElement): Rect => {
  const _rect = element.getBoundingClientRect();
  const rect = {
    left: _rect.left,
    right: _rect.right,
    top: _rect.top,
    bottom: _rect.bottom,
  };

  if (hasBiggerChild(element, 'x') && !isScrollingOrHidden(element, 'x')) {
    const width = rect.right - rect.left;
    rect.right = rect.right + element.scrollWidth - width;
  }

  if (hasBiggerChild(element, 'y') && !isScrollingOrHidden(element, 'y')) {
    const height = rect.bottom - rect.top;
    rect.bottom = rect.bottom + element.scrollHeight - height;
  }

  return rect;
};

export const getScrollingAxis = (element: HTMLElement): ScrollAxis | null => {
  const style = window.getComputedStyle(element);
  const overflow = style['overflow'];
  const general = overflow === 'auto' || overflow === 'scroll';
  if (general) return ScrollAxis.xy;
  const overFlowX = style[`overflow-x` as any];
  const xScroll = overFlowX === 'auto' || overFlowX === 'scroll';
  const overFlowY = style[`overflow-y` as any];
  const yScroll = overFlowY === 'auto' || overFlowY === 'scroll';

  if (xScroll && yScroll) return ScrollAxis.xy;
  if (xScroll) return ScrollAxis.x;
  if (yScroll) return ScrollAxis.y;
  return null;
};

export const isScrolling = (element: HTMLElement, axis: Axis) => {
  const style = window.getComputedStyle(element);
  const overflow = style['overflow'];
  const overFlowAxis = style[`overflow-${axis}` as any];
  const general = overflow === 'auto' || overflow === 'scroll';
  const dimensionScroll = overFlowAxis === 'auto' || overFlowAxis === 'scroll';
  return general || dimensionScroll;
};

export const isScrollingOrHidden = (element: HTMLElement, axis: Axis) => {
  const style = window.getComputedStyle(element);
  const overflow = style['overflow'];
  const overFlowAxis = style[`overflow-${axis}` as any];
  const general = overflow === 'auto' || overflow === 'scroll' || overflow === 'hidden';
  const dimensionScroll = overFlowAxis === 'auto' || overFlowAxis === 'scroll' || overFlowAxis === 'hidden';
  return general || dimensionScroll;
};

export const hasBiggerChild = (element: HTMLElement, axis: Axis) => {
  if (axis === 'x') {
    return element.scrollWidth > element.clientWidth;
  } else {
    return element.scrollHeight > element.clientHeight;
  }
};

export const hasScrollBar = (element: HTMLElement, axis: Axis) => {
  return hasBiggerChild(element, axis) && isScrolling(element, axis);
};

export const getVisibleRect = (element: HTMLElement, elementRect: Rect) => {
  let currentElement = element;
  let rect = elementRect || getContainerRect(element);
  currentElement = element.parentElement!;
  while (currentElement) {
    if (hasBiggerChild(currentElement, 'x') && isScrollingOrHidden(currentElement, 'x')) {
      rect = getIntersectionOnAxis(rect, currentElement.getBoundingClientRect(), 'x');
    }

    if (hasBiggerChild(currentElement, 'y') && isScrollingOrHidden(currentElement, 'y')) {
      rect = getIntersectionOnAxis(rect, currentElement.getBoundingClientRect(), 'y');
    }

    currentElement = currentElement.parentElement!;
  }

  return rect;
};

export const getParentRelevantContainerElement = (element: Element, relevantContainers: IContainer[]) => {
  let current: ElementX = element as ElementX;

  while (current) {
    if ((current as ElementX)[containerInstance]) {
      const container = current[containerInstance];
      if (relevantContainers.some(p => p === container)) {
        return container;
      }
    }
    current = current.parentElement as ElementX;
  }

  return null;
}

export const listenScrollParent = (element: HTMLElement, clb: () => void) => {
  let scrollers: HTMLElement[] = [];

  setScrollers();

  function setScrollers() {
    let currentElement = element;
    while (currentElement) {
      if (isScrolling(currentElement, 'x') || isScrolling(currentElement, 'y')) {
        scrollers.push(currentElement);
      }
      currentElement = currentElement.parentElement!;
    }
  }

  function dispose() {
    stop();
    scrollers = null!;
  };

  function start() {
    if (scrollers) {
      scrollers.forEach(p => p.addEventListener('scroll', clb));
      window.addEventListener('scroll', clb);
    }
  }

  function stop() {
    if (scrollers) {
      scrollers.forEach(p => p.removeEventListener('scroll', clb));
      window.removeEventListener('scroll', clb);
    }
  }

  return {
    dispose,
    start,
    stop
  };
};

export const hasParent = (element: HTMLElement, parent: HTMLElement) => {
  let current: HTMLElement | null = element;
  while (current) {
    if (current === parent) {
      return true;
    }
    current = current.parentElement;
  }
  return false;
};

export const getParent = (element: Element | null, selector: string) => {
  let current: Element | null = element;
  while (current) {
    if (current.matches(selector)) {
      return current;
    }
    current = current.parentElement;
  }

  return null;
};

export const hasClass = (element: HTMLElement, cls: string) => {
  return (
    element.className
      .split(' ')
      .map(p => p)
      .indexOf(cls) > -1
  );
};

export const addClass = (element: Element | null | undefined, cls: string) => {
  if (element) {
    const classes = element.className.split(' ').filter(p => p);
    if (classes.indexOf(cls) === -1) {
      classes.unshift(cls);
      element.className = classes.join(' ');
    }
  }
};

export const removeClass = (element: HTMLElement, cls: string) => {
  if (element) {
    const classes = element.className.split(' ').filter(p => p && p !== cls);
    element.className = classes.join(' ');
  }
};

export const debounce = (fn: Function, delay: number, immediate: boolean) => {
  let timer: any = null;
  return (...params: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate && !timer) {
      fn.call(null, ...params);
    } else {
      timer = setTimeout(() => {
        timer = null;
        fn.call(null, ...params);
      }, delay);
    }
  };
};

export const removeChildAt = (parent: HTMLElement, index: number) => {
  return parent.removeChild(parent.children[index]);
};

export const addChildAt = (parent: HTMLElement, child: HTMLElement, index: number) => {
  if (index >= parent.children.length) {
    parent.appendChild(child);
  } else {
    parent.insertBefore(child, parent.children[index]);
  }
};

export const isMobile = () => {
  if (typeof window !== 'undefined') {
    if (
      window.navigator.userAgent.match(/Android/i) ||
      window.navigator.userAgent.match(/webOS/i) ||
      window.navigator.userAgent.match(/iPhone/i) ||
      window.navigator.userAgent.match(/iPad/i) ||
      window.navigator.userAgent.match(/iPod/i) ||
      window.navigator.userAgent.match(/BlackBerry/i) ||
      window.navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

export const clearSelection = () => {
  if (window.getSelection) {
    if (window.getSelection().empty) {
      // Chrome
      window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) {
      // Firefox
      window.getSelection().removeAllRanges();
    }
  } else if ((window.document as any).selection) {
    // IE?
    (window.document as any).selection.empty();
  }
};

export const getElementCursor = (element: Element | null) => {
  if (element) {
    const style = window.getComputedStyle(element);
    if (style) {
      return style.cursor;
    }
  }

  return null;
};


export const getDistanceToParent = (parent: HTMLElement, child: HTMLElement): number | null => {
  let current: Element | null = child;
  let dist = 0;
  while (current) {
    if (current === parent) {
      return dist;
    }
    dist++;
    current = current.parentElement;
  }

  return null;
}

export function isVisible(rect: Rect): boolean {
  return !(rect.bottom <= rect.top || rect.right <= rect.left);
}