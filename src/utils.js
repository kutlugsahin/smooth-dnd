export const getIntersection = (rect1, rect2) => {
  return {
    left: Math.max(rect1.left, rect2.left),
    top: Math.max(rect1.top, rect2.top),
    right: Math.min(rect1.right, rect2.right),
    bottom: Math.min(rect1.bottom, rect2.bottom),
  }
}

export const getIntersectionOnAxis = (rect1, rect2, axis) => {
  if (axis === 'x') {
    return {
      left: Math.max(rect1.left, rect2.left),
      top: rect1.top,
      right: Math.min(rect1.right, rect2.right),
      bottom: rect1.bottom
    }
  } else {
    return {
      left: rect1.left,
      top: Math.max(rect1.top, rect2.top),
      right: rect1.right,
      bottom: Math.min(rect1.bottom, rect2.bottom),
    }
  }
}

export const getContainerRect = (element) => {
  const _rect = element.getBoundingClientRect();
  const rect = { 
    left: _rect.left,
    right: _rect.right + 10,
    top: _rect.top,
    bottom: _rect.bottom
  }
  
  if (hasBiggerChild(element, 'x') && !isScrollingOrHidden(element, 'x')) {
    const width = rect.right - rect.left;
    rect.right = rect.right + element.scrollWidth - width;
  }

  if (hasBiggerChild(element, 'y') && !isScrollingOrHidden(element, 'y')) {
    const height = rect.bottom - rect.top;
    rect.bottom = rect.bottom + element.scrollHeight - height;
  }

  return rect;
}

export const isScrolling = (element, axis) => {
  const style = window.getComputedStyle(element);
  const overflow = style['overflow'];
  const overFlowAxis = style[`overflow-${axis}`];
  const general = overflow === 'auto' || overflow === 'scroll';
  const dimensionScroll = overFlowAxis === 'auto' || overFlowAxis === 'scroll';
  return general || dimensionScroll;
}

export const isScrollingOrHidden = (element, axis) => {
  const style = window.getComputedStyle(element);
  const overflow = style['overflow'];
  const overFlowAxis = style[`overflow-${axis}`];
  const general = overflow === 'auto' || overflow === 'scroll' || overflow === 'hidden';
  const dimensionScroll = overFlowAxis === 'auto' || overFlowAxis === 'scroll' || overFlowAxis === 'hidden';
  return general || dimensionScroll;
}

export const hasBiggerChild = (element, axis) => {
  if (axis === 'x') {
    return element.scrollWidth > element.clientWidth
  } else {
    return element.scrollHeight > element.clientHeight;
  }
}

export const hasScrollBar = (element, axis) => {
  return hasBiggerChild(element, axis) && isScrolling(element, axis);
}

export const getVisibleRect = (element, elementRect) => {
  let currentElement = element;
  let rect = elementRect || getContainerRect(element);
  currentElement = element.parentElement;
  while (currentElement) {
    if (hasBiggerChild(currentElement, 'x') && isScrollingOrHidden(currentElement, 'x')) {
      rect = getIntersectionOnAxis(rect, currentElement.getBoundingClientRect(), 'x');
    }

    if (hasBiggerChild(currentElement, 'y') && isScrollingOrHidden(currentElement, 'y')) {
      rect = getIntersectionOnAxis(rect, currentElement.getBoundingClientRect(), 'y');
    }

    currentElement = currentElement.parentElement;
  }

  return rect;
}

export const listenScrollParent = (element, clb) => {
  let scrollers = [];
  const dispose = () => {
    scrollers.forEach(p => {
      p.removeEventListener('scroll', clb);
    });
    window.removeEventListener('scroll', clb);
  }

  setTimeout(function() {
    let currentElement = element;
    while (currentElement) {
      if (isScrolling(currentElement, 'x') || isScrolling(currentElement, 'y')) {
        currentElement.addEventListener('scroll', clb);
        scrollers.push(currentElement);
      }
      currentElement = currentElement.parentElement;
    }

    window.addEventListener('scroll', clb);
  }, 10);

  return {
    dispose
  }
}

export const hasParent = (element, parent) => {
  let current = element;
  while (current) {
    if (current === parent) {
      return true;
    }
    current = current.parentElement;
  }
  return false;
}

export const getParent = (element, selector) => {
  let current = element;
  while (current) {
    if (current.matches(selector)) {
      return current;
    }
    current = current.parentElement;
  }

  return null;
}

export const hasClass = (element, cls) => {
  return element.className.split(' ').map(p => p).indexOf(cls) > -1;
}

export const addClass = (element, cls) => {
  if (element) {
    const classes = element.className.split(' ').filter(p => p);
    if (classes.indexOf(cls) === -1) {
      classes.push(cls);
      element.className = classes.join(' ');
    }
  }
}

export const removeClass = (element, cls) => {
  if (element) {
    const classes = element.className.split(' ').filter(p => p && p !== cls);
    element.className = classes.join(' ');
  }
}

export const debounce = (fn, delay, immediate) => {
  let timer = null;
  return (...params) => {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate && !timer) {
      fn.call(this, ...params);
    } else {
      timer = setTimeout(() => {
        timer = null;
        fn.call(this, ...params);
      }, delay);
    }
  }
}

export const removeChildAt = (parent, index) => {
  return parent.removeChild(parent.children[index]);
}

export const addChildAt = (parent, child, index) => {
  if (index >= parent.children.lenght) {
    parent.appendChild(child);
  } else {
    parent.insertBefore(child, parent.children[index]);
  }
}

export const isMobile = () => {
  if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  }
  else {
    return false;
  }
}

export const clearSelection = () => {
  if (window.getSelection) {
    if (window.getSelection().empty) {  // Chrome
      window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) {  // Firefox
      window.getSelection().removeAllRanges();
    }
  } else if (document.selection) {  // IE?
    document.selection.empty();
  }
}