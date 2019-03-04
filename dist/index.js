(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.SmoothDnD = {}));
}(this, function (exports) { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	(function (constructor) {
	  if (constructor && constructor.prototype && !constructor.prototype.matches) {
	    constructor.prototype.matches = constructor.prototype.matchesSelector || constructor.prototype.mozMatchesSelector || constructor.prototype.msMatchesSelector || constructor.prototype.oMatchesSelector || constructor.prototype.webkitMatchesSelector || function (s) {
	      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
	          i = matches.length;

	      while (--i >= 0 && matches.item(i) !== this) {}

	      return i > -1;
	    };
	  }
	})(commonjsGlobal.Node || commonjsGlobal.Element); // Overwrites native 'firstElementChild' prototype.
	// Adds Document & DocumentFragment support for IE9 & Safari.
	// Returns array instead of HTMLCollection.


	(function (constructor) {
	  if (constructor && constructor.prototype && constructor.prototype.firstElementChild == null) {
	    Object.defineProperty(constructor.prototype, "firstElementChild", {
	      get: function get() {
	        var node,
	            nodes = this.childNodes,
	            i = 0;

	        while (node = nodes[i++]) {
	          if (node.nodeType === 1) {
	            return node;
	          }
	        }

	        return null;
	      }
	    });
	  }
	})(commonjsGlobal.Node || commonjsGlobal.Element); // Production steps of ECMA-262, Edition 5, 15.4.4.17
	// Reference: http://es5.github.io/#x15.4.4.17


	if (!Array.prototype.some) {
	  Array.prototype.some = function (fun
	  /*, thisArg*/
	  ) {

	    if (this == null) {
	      throw new TypeError("Array.prototype.some called on null or undefined");
	    }

	    if (typeof fun !== "function") {
	      throw new TypeError();
	    }

	    var t = Object(this);
	    var len = t.length >>> 0;
	    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;

	    for (var i = 0; i < len; i++) {
	      if (i in t && fun.call(thisArg, t[i], i, t)) {
	        return true;
	      }
	    }

	    return false;
	  };
	}

	var getIntersectionOnAxis = function getIntersectionOnAxis(rect1, rect2, axis) {
	  if (axis === 'x') {
	    return {
	      left: Math.max(rect1.left, rect2.left),
	      top: rect1.top,
	      right: Math.min(rect1.right, rect2.right),
	      bottom: rect1.bottom
	    };
	  } else {
	    return {
	      left: rect1.left,
	      top: Math.max(rect1.top, rect2.top),
	      right: rect1.right,
	      bottom: Math.min(rect1.bottom, rect2.bottom)
	    };
	  }
	};
	var getContainerRect = function getContainerRect(element) {
	  var _rect = element.getBoundingClientRect();

	  var rect = {
	    left: _rect.left,
	    right: _rect.right + 10,
	    top: _rect.top,
	    bottom: _rect.bottom
	  };

	  if (hasBiggerChild(element, 'x') && !isScrollingOrHidden(element, 'x')) {
	    var width = rect.right - rect.left;
	    rect.right = rect.right + element.scrollWidth - width;
	  }

	  if (hasBiggerChild(element, 'y') && !isScrollingOrHidden(element, 'y')) {
	    var height = rect.bottom - rect.top;
	    rect.bottom = rect.bottom + element.scrollHeight - height;
	  }

	  return rect;
	};
	var getScrollingAxis = function getScrollingAxis(element) {
	  var style = global.getComputedStyle(element);
	  var overflow = style['overflow'];
	  var general = overflow === 'auto' || overflow === 'scroll';
	  if (general) return 'xy';
	  var overFlowX = style["overflow-x"];
	  var xScroll = overFlowX === 'auto' || overFlowX === 'scroll';
	  var overFlowY = style["overflow-y"];
	  var yScroll = overFlowY === 'auto' || overFlowY === 'scroll';
	  return "".concat(xScroll ? 'x' : '').concat(yScroll ? 'y' : '') || null;
	};
	var isScrolling = function isScrolling(element, axis) {
	  var style = global.getComputedStyle(element);
	  var overflow = style['overflow'];
	  var overFlowAxis = style["overflow-".concat(axis)];
	  var general = overflow === 'auto' || overflow === 'scroll';
	  var dimensionScroll = overFlowAxis === 'auto' || overFlowAxis === 'scroll';
	  return general || dimensionScroll;
	};
	var isScrollingOrHidden = function isScrollingOrHidden(element, axis) {
	  var style = global.getComputedStyle(element);
	  var overflow = style['overflow'];
	  var overFlowAxis = style["overflow-".concat(axis)];
	  var general = overflow === 'auto' || overflow === 'scroll' || overflow === 'hidden';
	  var dimensionScroll = overFlowAxis === 'auto' || overFlowAxis === 'scroll' || overFlowAxis === 'hidden';
	  return general || dimensionScroll;
	};
	var hasBiggerChild = function hasBiggerChild(element, axis) {
	  if (axis === 'x') {
	    return element.scrollWidth > element.clientWidth;
	  } else {
	    return element.scrollHeight > element.clientHeight;
	  }
	};
	var getVisibleRect = function getVisibleRect(element, elementRect) {
	  var currentElement = element;
	  var rect = elementRect || getContainerRect(element);
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
	};
	var listenScrollParent = function listenScrollParent(element, clb) {
	  var scrollers = [];

	  var dispose = function dispose() {
	    scrollers.forEach(function (p) {
	      p.removeEventListener('scroll', clb);
	    });
	    global.removeEventListener('scroll', clb);
	  };

	  setTimeout(function () {
	    var currentElement = element;

	    while (currentElement) {
	      if (isScrolling(currentElement, 'x') || isScrolling(currentElement, 'y')) {
	        currentElement.addEventListener('scroll', clb);
	        scrollers.push(currentElement);
	      }

	      currentElement = currentElement.parentElement;
	    }

	    global.addEventListener('scroll', clb);
	  }, 10);
	  return {
	    dispose: dispose
	  };
	};
	var getParent = function getParent(element, selector) {
	  var current = element;

	  while (current) {
	    if (current.matches(selector)) {
	      return current;
	    }

	    current = current.parentElement;
	  }

	  return null;
	};
	var hasClass = function hasClass(element, cls) {
	  return element.className.split(' ').map(function (p) {
	    return p;
	  }).indexOf(cls) > -1;
	};
	var addClass = function addClass(element, cls) {
	  if (element) {
	    var classes = element.className.split(' ').filter(function (p) {
	      return p;
	    });

	    if (classes.indexOf(cls) === -1) {
	      classes.unshift(cls);
	      element.className = classes.join(' ');
	    }
	  }
	};
	var removeClass = function removeClass(element, cls) {
	  if (element) {
	    var classes = element.className.split(' ').filter(function (p) {
	      return p && p !== cls;
	    });
	    element.className = classes.join(' ');
	  }
	};
	var removeChildAt = function removeChildAt(parent, index) {
	  return parent.removeChild(parent.children[index]);
	};
	var addChildAt = function addChildAt(parent, child, index) {
	  if (index >= parent.children.length) {
	    parent.appendChild(child);
	  } else {
	    parent.insertBefore(child, parent.children[index]);
	  }
	};
	var isMobile = function isMobile() {
	  if (typeof window !== 'undefined') {
	    if (global.navigator.userAgent.match(/Android/i) || global.navigator.userAgent.match(/webOS/i) || global.navigator.userAgent.match(/iPhone/i) || global.navigator.userAgent.match(/iPad/i) || global.navigator.userAgent.match(/iPod/i) || global.navigator.userAgent.match(/BlackBerry/i) || global.navigator.userAgent.match(/Windows Phone/i)) {
	      return true;
	    } else {
	      return false;
	    }
	  }

	  return false;
	};
	var clearSelection = function clearSelection() {
	  if (global.getSelection) {
	    if (global.getSelection().empty) {
	      // Chrome
	      global.getSelection().empty();
	    } else if (global.getSelection().removeAllRanges) {
	      // Firefox
	      global.getSelection().removeAllRanges();
	    }
	  } else if (global.document.selection) {
	    // IE?
	    global.document.selection.empty();
	  }
	};
	var getElementCursor = function getElementCursor(element) {
	  if (element) {
	    var style = global.getComputedStyle(element);

	    if (style) {
	      return style.cursor;
	    }
	  }

	  return null;
	};

	var containerInstance = 'smooth-dnd-container-instance';
	var containersInDraggable = 'smooth-dnd-containers-in-draggable';
	var defaultGroupName = '@@smooth-dnd-default-group@@';
	var wrapperClass = 'smooth-dnd-draggable-wrapper';
	var defaultGrabHandleClass = 'smooth-dnd-default-grap-handle';
	var animationClass = 'animated';
	var translationValue = '__smooth_dnd_draggable_translation_value';
	var visibilityValue = '__smooth_dnd_draggable_visibility_value';
	var ghostClass = 'smooth-dnd-ghost';
	var containerClass = 'smooth-dnd-container';
	var extraSizeForInsertion = 'smooth-dnd-extra-size-for-insertion';
	var stretcherElementClass = 'smooth-dnd-stretcher-element';
	var stretcherElementInstance = 'smooth-dnd-stretcher-instance';
	var isDraggableDetached = 'smoth-dnd-is-draggable-detached';
	var disbaleTouchActions = 'smooth-dnd-disable-touch-action';
	var noUserSelectClass = 'smooth-dnd-no-user-select';

	var constants = /*#__PURE__*/Object.freeze({
		containerInstance: containerInstance,
		containersInDraggable: containersInDraggable,
		defaultGroupName: defaultGroupName,
		wrapperClass: wrapperClass,
		defaultGrabHandleClass: defaultGrabHandleClass,
		animationClass: animationClass,
		translationValue: translationValue,
		visibilityValue: visibilityValue,
		ghostClass: ghostClass,
		containerClass: containerClass,
		extraSizeForInsertion: extraSizeForInsertion,
		stretcherElementClass: stretcherElementClass,
		stretcherElementInstance: stretcherElementInstance,
		isDraggableDetached: isDraggableDetached,
		disbaleTouchActions: disbaleTouchActions,
		noUserSelectClass: noUserSelectClass
	});

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  }
	}

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	var _css;
	var verticalWrapperClass = {
	  'overflow': 'hidden',
	  'display': 'block'
	};
	var horizontalWrapperClass = {
	  'height': '100%',
	  'display': 'inline-block',
	  'vertical-align': 'top',
	  'white-space': 'normal'
	};
	var stretcherElementHorizontalClass = {
	  'display': 'inline-block'
	};
	var css = (_css = {}, _defineProperty(_css, ".".concat(containerClass), {
	  'position': 'relative'
	}), _defineProperty(_css, ".".concat(containerClass, " *"), {
	  'box-sizing': 'border-box'
	}), _defineProperty(_css, ".".concat(containerClass, ".horizontal"), {
	  'white-space': 'nowrap'
	}), _defineProperty(_css, ".".concat(containerClass, ".horizontal > .").concat(stretcherElementClass), stretcherElementHorizontalClass), _defineProperty(_css, ".".concat(containerClass, ".horizontal > .").concat(wrapperClass), horizontalWrapperClass), _defineProperty(_css, ".".concat(containerClass, ".vertical > .").concat(wrapperClass), verticalWrapperClass), _defineProperty(_css, ".".concat(wrapperClass), {// 'overflow': 'hidden'
	}), _defineProperty(_css, ".".concat(wrapperClass, ".horizontal"), horizontalWrapperClass), _defineProperty(_css, ".".concat(wrapperClass, ".vertical"), verticalWrapperClass), _defineProperty(_css, ".".concat(wrapperClass, ".animated"), {
	  'transition': 'transform ease'
	}), _defineProperty(_css, ".".concat(ghostClass, " *"), {
	  //'perspective': '800px',
	  'box-sizing': 'border-box'
	}), _defineProperty(_css, ".".concat(ghostClass, ".animated"), {
	  'transition': 'all ease-in-out'
	}), _defineProperty(_css, ".".concat(disbaleTouchActions, " *"), {
	  'touch-actions': 'none',
	  '-ms-touch-actions': 'none'
	}), _defineProperty(_css, ".".concat(noUserSelectClass, " *"), {
	  '-webkit-touch-callout': 'none',
	  '-webkit-user-select': 'none',
	  '-khtml-user-select': 'none',
	  '-moz-user-select': 'none',
	  '-ms-user-select': 'none',
	  'user-select': 'none'
	}), _css);

	function convertToCssString(css) {
	  return Object.keys(css).reduce(function (styleString, propName) {
	    var propValue = css[propName];

	    if (_typeof(propValue) === 'object') {
	      return "".concat(styleString).concat(propName, "{").concat(convertToCssString(propValue), "}");
	    }

	    return "".concat(styleString).concat(propName, ":").concat(propValue, ";");
	  }, '');
	}

	function addStyleToHead() {
	  if (typeof window !== 'undefined') {
	    var head = global.document.head || global.document.getElementsByTagName("head")[0];
	    var style = global.document.createElement("style");
	    var cssString = convertToCssString(css);
	    style.type = 'text/css';

	    if (style.styleSheet) {
	      style.styleSheet.cssText = cssString;
	    } else {
	      style.appendChild(global.document.createTextNode(cssString));
	    }

	    head.appendChild(style);
	  }
	}

	function addCursorStyleToBody(cursor) {
	  if (cursor && typeof window !== 'undefined') {
	    var head = global.document.head || global.document.getElementsByTagName("head")[0];
	    var style = global.document.createElement("style");
	    var cssString = convertToCssString({
	      'body *': {
	        cursor: "".concat(cursor, " !important")
	      }
	    });
	    style.type = 'text/css';

	    if (style.styleSheet) {
	      style.styleSheet.cssText = cssString;
	    } else {
	      style.appendChild(global.document.createTextNode(cssString));
	    }

	    head.appendChild(style);
	    return style;
	  }

	  return null;
	}

	function removeStyle(styleElement) {
	  if (styleElement && typeof window !== 'undefined') {
	    var head = global.document.head || global.document.getElementsByTagName("head")[0];
	    head.removeChild(styleElement);
	  }
	}

	var maxSpeed = 1500; // px/s

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

	var createAnimator = function createAnimator(element) {
	  var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'y';
	  var isAnimating = false;
	  var request = null;
	  var startTime = null;
	  var direction = null;
	  var speed = null;

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
	      request = requestAnimationFrame(function (timestamp) {
	        if (startTime === null) {
	          startTime = timestamp;
	        }

	        var timeDiff = timestamp - startTime;
	        startTime = timestamp;
	        var distanceDiff = timeDiff / 1000 * speed;
	        distanceDiff = direction === 'begin' ? 0 - distanceDiff : distanceDiff;
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
	    animate: animate,
	    stop: stop
	  };
	};

	function getAutoScrollInfo(position, scrollableInfo) {
	  var _scrollableInfo$rect = scrollableInfo.rect,
	      left = _scrollableInfo$rect.left,
	      right = _scrollableInfo$rect.right,
	      top = _scrollableInfo$rect.top,
	      bottom = _scrollableInfo$rect.bottom;
	  var x = position.x,
	      y = position.y;

	  if (x < left || x > right || y < top || y > bottom) {
	    return null;
	  }

	  var begin;
	  var end;
	  var pos;

	  if (scrollableInfo.axis === 'x') {
	    begin = left;
	    end = right;
	    pos = x;
	  } else {
	    begin = top;
	    end = bottom;
	    pos = y;
	  }

	  var moveDistance = 100;

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

	function scrollableInfo(element) {
	  var result = {
	    element: element,
	    rect: getVisibleRect(element, element.getBoundingClientRect()),
	    descendants: [],
	    invalidate: invalidate,
	    axis: 'y',
	    dispose: dispose
	  };

	  function dispose() {
	    element.removeEventListener('scroll', invalidate);
	  }

	  function invalidate() {
	    result.rect = getVisibleRect(element, element.getBoundingClientRect());
	    result.descendants.forEach(function (p) {
	      return p.invalidate();
	    });
	  }

	  element.addEventListener('scroll', invalidate);
	  return result;
	}

	function getScrollableElements(containerElements) {
	  var scrollables = [];
	  var firstDescendentScrollable = null;
	  containerElements.forEach(function (el) {
	    var current = el;
	    firstDescendentScrollable = null;

	    while (current) {
	      var scrollingAxis = getScrollingAxis(current);

	      if (scrollingAxis) {
	        if (!scrollables.some(function (p) {
	          return p.element === current;
	        })) {
	          var info = scrollableInfo(current);

	          if (firstDescendentScrollable) {
	            info.descendants.push(firstDescendentScrollable);
	          }

	          firstDescendentScrollable = info;

	          if (scrollingAxis === 'xy') {
	            scrollables.push(Object.assign({}, info, {
	              axis: 'x'
	            }));
	            scrollables.push(Object.assign({}, info, {
	              axis: 'y'
	            }, {
	              descendants: []
	            }));
	          } else {
	            scrollables.push(Object.assign({}, info, {
	              axis: scrollingAxis
	            }));
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
	      left: 0,
	      right: global.innerWidth,
	      top: 0,
	      bottom: global.innerHeight
	    };
	  }

	  return [Object.assign({
	    rect: getWindowRect(),
	    axis: 'y'
	  }, createAnimator(global)), Object.assign({
	    rect: getWindowRect(),
	    axis: 'x'
	  }, createAnimator(global, 'x'))];
	}

	var dragScroller = (function (containers) {
	  var scrollablesInfo = getScrollableElements(containers.map(function (p) {
	    return p.element;
	  }));
	  var animators = [].concat(_toConsumableArray(scrollablesInfo.map(getScrollableAnimator)), _toConsumableArray(getWindowAnimators()));
	  return function (_ref) {
	    var draggableInfo = _ref.draggableInfo,
	        reset = _ref.reset;

	    if (animators.length) {
	      if (reset) {
	        animators.forEach(function (p) {
	          return p.stop();
	        });
	        scrollablesInfo.forEach(function (p) {
	          return p.dispose();
	        });
	        return;
	      }

	      animators.forEach(function (animator) {
	        var scrollParams = getAutoScrollInfo(draggableInfo.mousePosition, animator);

	        if (scrollParams) {
	          animator.animate(scrollParams.direction, scrollParams.speedFactor * maxSpeed);
	        } else {
	          animator.stop();
	        }
	      });
	    }
	  };
	});

	var grabEvents = ['mousedown', 'touchstart'];
	var moveEvents = ['mousemove', 'touchmove'];
	var releaseEvents = ['mouseup', 'touchend'];
	var dragListeningContainers = null;
	var grabbedElement = null;
	var ghostInfo = null;
	var draggableInfo = null;
	var containers = [];
	var isDragging = false;
	var handleDrag = null;
	var handleScroll = null;
	var sourceContainerLockAxis = null;
	var cursorStyleElement = null; // Utils.addClass(document.body, 'clearfix');

	var isMobile$1 = isMobile();

	function listenEvents() {
	  if (typeof window !== 'undefined') {
	    addGrabListeners();
	  }
	}

	function addGrabListeners() {
	  grabEvents.forEach(function (e) {
	    global.document.addEventListener(e, onMouseDown, {
	      passive: false
	    });
	  });
	}

	function addMoveListeners() {
	  moveEvents.forEach(function (e) {
	    global.document.addEventListener(e, onMouseMove, {
	      passive: false
	    });
	  });
	}

	function removeMoveListeners() {
	  moveEvents.forEach(function (e) {
	    global.document.removeEventListener(e, onMouseMove, {
	      passive: false
	    });
	  });
	}

	function addReleaseListeners() {
	  releaseEvents.forEach(function (e) {
	    global.document.addEventListener(e, onMouseUp, {
	      passive: false
	    });
	  });
	}

	function removeReleaseListeners() {
	  releaseEvents.forEach(function (e) {
	    global.document.removeEventListener(e, onMouseUp, {
	      passive: false
	    });
	  });
	}

	function getGhostParent() {
	  if (draggableInfo && draggableInfo.ghostParent) {
	    return draggableInfo.ghostParent;
	  }

	  if (grabbedElement) {
	    return grabbedElement.parentElement || global.document.body;
	  } else {
	    return global.document.body;
	  }
	}

	function getGhostElement(wrapperElement, _ref, container, cursor) {
	  var x = _ref.x,
	      y = _ref.y;

	  // const { scaleX = 1, scaleY = 1 } = container.getScale();
	  var _wrapperElement$getBo = wrapperElement.getBoundingClientRect(),
	      left = _wrapperElement$getBo.left,
	      top = _wrapperElement$getBo.top,
	      right = _wrapperElement$getBo.right,
	      bottom = _wrapperElement$getBo.bottom;

	  var midX = left + (right - left) / 2;
	  var midY = top + (bottom - top) / 2;
	  var ghost = wrapperElement.cloneNode(true);
	  ghost.style.zIndex = '1000';
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
	    setTimeout(function () {
	      addClass(ghost.firstElementChild, container.getOptions().dragClass);
	      var dragCursor = global.getComputedStyle(ghost.firstElementChild).cursor;
	      cursorStyleElement = addCursorStyleToBody(dragCursor);
	    });
	  } else {
	    cursorStyleElement = addCursorStyleToBody(cursor);
	  }

	  addClass(ghost, container.getOptions().orientation || 'vertical');
	  addClass(ghost, ghostClass);
	  return {
	    ghost: ghost,
	    centerDelta: {
	      x: midX - x,
	      y: midY - y
	    },
	    positionDelta: {
	      left: left - x,
	      top: top - y
	    }
	  };
	}

	function getDraggableInfo(draggableElement) {
	  var container = containers.filter(function (p) {
	    return draggableElement.parentElement === p.element;
	  })[0];
	  var draggableIndex = container.draggables.indexOf(draggableElement);
	  var getGhostParent = container.getOptions().getGhostParent;
	  return {
	    container: container,
	    element: draggableElement,
	    elementIndex: draggableIndex,
	    payload: container.getOptions().getChildPayload ? container.getOptions().getChildPayload(draggableIndex) : undefined,
	    targetElement: null,
	    position: {
	      x: 0,
	      y: 0
	    },
	    groupName: container.getOptions().groupName,
	    ghostParent: getGhostParent ? getGhostParent() : null,
	    invalidateShadow: null,
	    mousePosition: null
	  };
	}

	function handleDropAnimation(callback) {
	  function endDrop() {
	    removeClass(ghostInfo.ghost, 'animated');
	    ghostInfo.ghost.style.transitionDuration = null;
	    getGhostParent().removeChild(ghostInfo.ghost);
	    callback();
	  }

	  function animateGhostToPosition(_ref2, duration, dropClass) {
	    var top = _ref2.top,
	        left = _ref2.left;
	    addClass(ghostInfo.ghost, 'animated');

	    if (dropClass) {
	      addClass(ghostInfo.ghost.firstElementChild, dropClass);
	    }

	    ghostInfo.ghost.style.transitionDuration = duration + 'ms';
	    ghostInfo.ghost.style.left = left + 'px';
	    ghostInfo.ghost.style.top = top + 'px';
	    setTimeout(function () {
	      endDrop();
	    }, duration + 20);
	  }

	  function shouldAnimateDrop(options) {
	    return options.shouldAnimateDrop ? options.shouldAnimateDrop(draggableInfo.container.getOptions(), draggableInfo.payload) : true;
	  }

	  if (draggableInfo.targetElement) {
	    var container = containers.filter(function (p) {
	      return p.element === draggableInfo.targetElement;
	    })[0];

	    if (shouldAnimateDrop(container.getOptions())) {
	      var dragResult = container.getDragResult();
	      animateGhostToPosition(dragResult.shadowBeginEnd.rect, Math.max(150, container.getOptions().animationDuration / 2), container.getOptions().dropClass);
	    } else {
	      endDrop();
	    }
	  } else {
	    var _container = containers.filter(function (p) {
	      return p === draggableInfo.container;
	    })[0];

	    var _container$getOptions = _container.getOptions(),
	        behaviour = _container$getOptions.behaviour,
	        removeOnDropOut = _container$getOptions.removeOnDropOut;

	    if (behaviour === 'move' && !removeOnDropOut && _container.getDragResult()) {
	      var _ref3 = _container.getDragResult(),
	          removedIndex = _ref3.removedIndex,
	          elementSize = _ref3.elementSize;

	      var layout = _container.layout; // drag ghost to back

	      _container.getTranslateCalculator({
	        dragResult: {
	          removedIndex: removedIndex,
	          addedIndex: removedIndex,
	          elementSize: elementSize,
	          pos: undefined,
	          shadowBeginEnd: undefined
	        }
	      });

	      var prevDraggableEnd = removedIndex > 0 ? layout.getBeginEnd(_container.draggables[removedIndex - 1]).end : layout.getBeginEndOfContainer().begin;
	      animateGhostToPosition(layout.getTopLeftOfElementBegin(prevDraggableEnd), _container.getOptions().animationDuration, _container.getOptions().dropClass);
	    } else {
	      addClass(ghostInfo.ghost, 'animated');
	      ghostInfo.ghost.style.transitionDuration = _container.getOptions().animationDuration + 'ms';
	      ghostInfo.ghost.style.opacity = '0';
	      ghostInfo.ghost.style.transform = 'scale(0.90)';
	      setTimeout(function () {
	        endDrop();
	      }, _container.getOptions().animationDuration);
	    }
	  }
	}

	var handleDragStartConditions = function handleDragStartConditions() {
	  var startEvent;
	  var delay;
	  var clb;
	  var timer = null;
	  var moveThreshold = 1;
	  var maxMoveInDelay = 5;

	  function onMove(event) {
	    var _getPointerEvent = getPointerEvent(event),
	        currentX = _getPointerEvent.clientX,
	        currentY = _getPointerEvent.clientY;

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

	    moveEvents.forEach(function (e) {
	      return global.document.addEventListener(e, onMove);
	    }, {
	      passive: false
	    });
	    releaseEvents.forEach(function (e) {
	      return global.document.addEventListener(e, onUp);
	    }, {
	      passive: false
	    });
	    global.document.addEventListener('drag', onHTMLDrag, {
	      passive: false
	    });
	  }

	  function deregisterEvent() {
	    clearTimeout(timer);
	    moveEvents.forEach(function (e) {
	      return global.document.removeEventListener(e, onMove);
	    }, {
	      passive: false
	    });
	    releaseEvents.forEach(function (e) {
	      return global.document.removeEventListener(e, onUp);
	    }, {
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

	  return function (_startEvent, _delay, _clb) {
	    startEvent = getPointerEvent(_startEvent);
	    delay = typeof _delay === 'number' ? _delay : isMobile$1 ? 200 : 0;
	    clb = _clb;
	    registerEvents();
	  };
	}();

	function onMouseDown(event) {
	  var e = getPointerEvent(event);

	  if (!isDragging && (e.button === undefined || e.button === 0)) {
	    grabbedElement = getParent(e.target, '.' + wrapperClass);

	    if (grabbedElement) {
	      var containerElement = getParent(grabbedElement, '.' + containerClass);
	      var container = containers.filter(function (p) {
	        return p.element === containerElement;
	      })[0];
	      var dragHandleSelector = container.getOptions().dragHandleSelector;
	      var nonDragAreaSelector = container.getOptions().nonDragAreaSelector;
	      var startDrag = true;

	      if (dragHandleSelector && !getParent(e.target, dragHandleSelector)) {
	        startDrag = false;
	      }

	      if (nonDragAreaSelector && getParent(e.target, nonDragAreaSelector)) {
	        startDrag = false;
	      }

	      if (startDrag) {
	        handleDragStartConditions(e, container.getOptions().dragBeginDelay, function () {
	          clearSelection();
	          initiateDrag(e, getElementCursor(event.target));
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
	  handleScroll({
	    reset: true
	  });

	  if (cursorStyleElement) {
	    removeStyle(cursorStyleElement);
	    cursorStyleElement = null;
	  }

	  if (draggableInfo) {
	    handleDropAnimation(function () {
	      removeClass(global.document.body, disbaleTouchActions);
	      removeClass(global.document.body, noUserSelectClass);
	      fireOnDragStartEnd(false);
	      (dragListeningContainers || []).forEach(function (p) {
	        p.handleDrop(draggableInfo);
	      });
	      dragListeningContainers = null;
	      grabbedElement = null;
	      ghostInfo = null;
	      draggableInfo = null;
	      isDragging = false;
	      sourceContainerLockAxis = null;
	      handleDrag = null;
	    });
	  }
	}

	function getPointerEvent(e) {
	  return e.touches ? e.touches[0] : e;
	}

	function dragHandler(dragListeningContainers) {
	  var targetContainers = dragListeningContainers;
	  return function (draggableInfo) {
	    var containerBoxChanged = false;
	    targetContainers.forEach(function (p) {
	      var dragResult = p.handleDrag(draggableInfo);
	      containerBoxChanged = !!dragResult.containerBoxChanged || false;
	      dragResult.containerBoxChanged = false;
	    });
	    handleScroll({
	      draggableInfo: draggableInfo
	    });

	    if (containerBoxChanged) {
	      containerBoxChanged = false;
	      setTimeout(function () {
	        containers.forEach(function (p) {
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
	    return function (props) {
	      return null;
	    };
	  }
	}

	function fireOnDragStartEnd(isStart) {
	  containers.forEach(function (p) {
	    var fn = isStart ? p.getOptions().onDragStart : p.getOptions().onDragEnd;

	    if (fn) {
	      var options = {
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
	  if (grabbedElement !== null) {
	    isDragging = true;
	    var container = containers.filter(function (p) {
	      return grabbedElement.parentElement === p.element;
	    })[0];
	    container.setDraggables();
	    sourceContainerLockAxis = container.getOptions().lockAxis ? container.getOptions().lockAxis.toLowerCase() : null;
	    draggableInfo = getDraggableInfo(grabbedElement);
	    ghostInfo = getGhostElement(grabbedElement, {
	      x: position.clientX,
	      y: position.clientY
	    }, draggableInfo.container, cursor);
	    draggableInfo.position = {
	      x: position.clientX + ghostInfo.centerDelta.x,
	      y: position.clientY + ghostInfo.centerDelta.y
	    };
	    draggableInfo.mousePosition = {
	      x: position.clientX,
	      y: position.clientY
	    };
	    addClass(global.document.body, disbaleTouchActions);
	    addClass(global.document.body, noUserSelectClass);
	    dragListeningContainers = containers.filter(function (p) {
	      return p.isDragRelevant(container, draggableInfo.payload);
	    });
	    handleDrag = dragHandler(dragListeningContainers);

	    if (handleScroll) {
	      handleScroll({
	        reset: true,
	        draggableInfo: undefined
	      });
	    }

	    handleScroll = getScrollHandler(container, dragListeningContainers);
	    dragListeningContainers.forEach(function (p) {
	      return p.prepareDrag(p, dragListeningContainers);
	    });
	    fireOnDragStartEnd(true);
	    handleDrag(draggableInfo);
	    getGhostParent().appendChild(ghostInfo.ghost);
	  }
	}

	function onMouseMove(event) {
	  event.preventDefault();
	  var e = getPointerEvent(event);

	  if (!draggableInfo) {
	    initiateDrag(e, getElementCursor(event.target));
	  } else {
	    // just update ghost position && draggableInfo position
	    if (sourceContainerLockAxis) {
	      if (sourceContainerLockAxis === 'y') {
	        ghostInfo.ghost.style.top = "".concat(e.clientY + ghostInfo.positionDelta.top, "px");
	        draggableInfo.position.y = e.clientY + ghostInfo.centerDelta.y;
	        draggableInfo.mousePosition.y = e.clientY;
	      } else if (sourceContainerLockAxis === 'x') {
	        ghostInfo.ghost.style.left = "".concat(e.clientX + ghostInfo.positionDelta.left, "px");
	        draggableInfo.position.x = e.clientX + ghostInfo.centerDelta.x;
	        draggableInfo.mousePosition.x = e.clientX;
	      }
	    } else {
	      ghostInfo.ghost.style.left = "".concat(e.clientX + ghostInfo.positionDelta.left, "px");
	      ghostInfo.ghost.style.top = "".concat(e.clientY + ghostInfo.positionDelta.top, "px");
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
	    register: function register(container) {
	      containers.push(container);
	    },
	    unregister: function unregister(container) {
	      containers.splice(containers.indexOf(container), 1);
	    }
	  };
	}

	addStyleToHead();
	var Mediator$1 = Mediator();

	var horizontalMap = {
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
	    'translate': function translate(val) {
	      return "translate3d(".concat(val, "px, 0, 0)");
	    }
	  }
	};
	var verticalMap = {
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
	    'translate': function translate(val) {
	      return "translate3d(0,".concat(val, "px, 0)");
	    }
	  }
	};

	function orientationDependentProps(map) {
	  function get(obj, prop) {
	    var mappedProp = map[prop];
	    return obj[mappedProp || prop];
	  }

	  function set(obj, prop, value) {
	    requestAnimationFrame(function () {
	      obj[map[prop]] = map.setters[prop] ? map.setters[prop](value) : value;
	    });
	  }

	  return {
	    get: get,
	    set: set
	  };
	}

	function layoutManager(containerElement, orientation, _animationDuration) {
	  containerElement[extraSizeForInsertion] = 0;
	  var animationDuration = _animationDuration;
	  var map = orientation === 'horizontal' ? horizontalMap : verticalMap;
	  var propMapper = orientationDependentProps(map);
	  var values = {
	    translation: 0
	  };
	  var registeredScrollListener = null;
	  global.addEventListener('resize', function () {
	    invalidateContainerRectangles(containerElement); // invalidateContainerScale(containerElement);
	  });
	  setTimeout(function () {
	    invalidate();
	  }, 10); // invalidate();

	  var scrollListener = listenScrollParent(containerElement, function () {
	    invalidateContainerRectangles(containerElement);
	    registeredScrollListener && registeredScrollListener();
	  });

	  function invalidate() {
	    invalidateContainerRectangles(containerElement);
	    invalidateContainerScale(containerElement);
	  }

	  function invalidateContainerRectangles(containerElement) {
	    values.rect = getContainerRect(containerElement);
	    values.visibleRect = getVisibleRect(containerElement, values.rect);
	  }

	  function invalidateContainerScale(containerElement) {
	    var rect = containerElement.getBoundingClientRect();
	    values.scaleX = containerElement.offsetWidth ? (rect.right - rect.left) / containerElement.offsetWidth : 1;
	    values.scaleY = containerElement.offsetHeight ? (rect.bottom - rect.top) / containerElement.offsetHeight : 1;
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
	    var begin = propMapper.get(values.rect, 'begin') + values.translation;
	    var end = propMapper.get(values.rect, 'end') + values.translation;
	    return {
	      begin: begin,
	      end: end
	    };
	  }

	  function getBeginEndOfContainerVisibleRect() {
	    var begin = propMapper.get(values.visibleRect, 'begin') + values.translation;
	    var end = propMapper.get(values.visibleRect, 'end') + values.translation;
	    return {
	      begin: begin,
	      end: end
	    };
	  }

	  function getContainerScale() {
	    return {
	      scaleX: values.scaleX,
	      scaleY: values.scaleY
	    };
	  }

	  function getSize(element) {
	    return propMapper.get(element, 'size') * propMapper.get(values, 'scale');
	  }

	  function getDistanceToOffsetParent(element) {
	    var distance = propMapper.get(element, 'distanceToParent') + (element[translationValue] || 0);
	    return distance * propMapper.get(values, 'scale');
	  }

	  function getBeginEnd(element) {
	    var begin = getDistanceToOffsetParent(element) + (propMapper.get(values.rect, 'begin') + values.translation) - propMapper.get(containerElement, 'scrollValue');
	    return {
	      begin: begin,
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
	      container.getChildContainers().forEach(function (p) {
	        return updateDescendantContainerRects(p);
	      });
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
	      setTimeout(function () {
	        element[containersInDraggable].forEach(function (p) {
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
	    var _values$visibleRect = values.visibleRect,
	        left = _values$visibleRect.left,
	        top = _values$visibleRect.top,
	        right = _values$visibleRect.right,
	        bottom = _values$visibleRect.bottom; // if there is no wrapper in rect size will be 0 and wont accept any drop
	    // so make sure at least there is 30px difference

	    if (bottom - top < 2) {
	      bottom = top + 30;
	    }

	    var containerRect = values.rect;

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
	    var top = 0;
	    var left = 0;

	    if (orientation === 'horizontal') {
	      left = begin;
	      top = values.rect.top;
	    } else {
	      left = values.rect.left;
	      top = begin;
	    }

	    return {
	      top: top,
	      left: left
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
	    } // if (visibleRect) {
	    // 	visibleRect.parentNode.removeChild(visibleRect);
	    // 	visibleRect = null;
	    // }

	  }

	  function getPosition(position) {
	    return isInVisibleRect(position.x, position.y) ? getAxisValue(position) : null;
	  }

	  function invalidateRects() {
	    invalidateContainerRectangles(containerElement);
	  }

	  return {
	    getSize: getSize,
	    //getDistanceToContainerBegining,
	    getContainerRectangles: getContainerRectangles,
	    getBeginEndOfDOMRect: getBeginEndOfDOMRect,
	    getBeginEndOfContainer: getBeginEndOfContainer,
	    getBeginEndOfContainerVisibleRect: getBeginEndOfContainerVisibleRect,
	    getBeginEnd: getBeginEnd,
	    getAxisValue: getAxisValue,
	    setTranslation: setTranslation,
	    getTranslation: getTranslation,
	    setVisibility: setVisibility,
	    isVisible: isVisible,
	    isInVisibleRect: isInVisibleRect,
	    dispose: dispose,
	    getContainerScale: getContainerScale,
	    setScrollListener: setScrollListener,
	    setSize: setSize,
	    getTopLeftOfElementBegin: getTopLeftOfElementBegin,
	    getScrollSize: getScrollSize,
	    getScrollValue: getScrollValue,
	    setScrollValue: setScrollValue,
	    invalidate: invalidate,
	    invalidateRects: invalidateRects,
	    getPosition: getPosition
	  };
	}

	function domDropHandler(_ref) {
	  var element = _ref.element,
	      draggables = _ref.draggables;
	  return function (dropResult, onDrop) {
	    var _ref2 = dropResult,
	        removedIndex = _ref2.removedIndex,
	        addedIndex = _ref2.addedIndex,
	        droppedElement = _ref2.droppedElement;
	    var removedWrapper = null;

	    if (removedIndex !== null) {
	      removedWrapper = removeChildAt(element, removedIndex);
	      draggables.splice(removedIndex, 1);
	    }

	    if (addedIndex !== null) {
	      var wrapper = global.document.createElement('div');
	      wrapper.className = "".concat(wrapperClass);
	      wrapper.appendChild(removedWrapper && removedWrapper.firstElementChild ? removedWrapper.firstElementChild : droppedElement);
	      wrapper[containersInDraggable] = [];
	      addChildAt(element, wrapper, addedIndex);

	      if (addedIndex >= draggables.length) {
	        draggables.push(wrapper);
	      } else {
	        draggables.splice(addedIndex, 0, wrapper);
	      }
	    }

	    if (onDrop) {
	      onDrop(dropResult);
	    }
	  };
	}
	function reactDropHandler() {
	  var handler = function handler() {
	    return function (dropResult, onDrop) {
	      if (onDrop) {
	        onDrop(dropResult);
	      }
	    };
	  };

	  return {
	    handler: handler
	  };
	}

	var dropHandlers = /*#__PURE__*/Object.freeze({
		domDropHandler: domDropHandler,
		reactDropHandler: reactDropHandler
	});

	var defaultOptions = {
	  groupName: undefined,
	  behaviour: 'move',
	  // move | copy
	  orientation: 'vertical',
	  // vertical | horizontal
	  getChildPayload: undefined,
	  animationDuration: 250,
	  autoScrollEnabled: true,
	  shouldAcceptDrop: undefined,
	  shouldAnimateDrop: undefined
	};

	function setAnimation(element, add) {
	  var animationDuration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultOptions.animationDuration;

	  if (add) {
	    addClass(element, animationClass);
	    element.style.transitionDuration = animationDuration + 'ms';
	  } else {
	    removeClass(element, animationClass);
	    element.style.removeProperty('transition-duration');
	  }
	}

	function getContainer(element) {
	  return element ? element[containerInstance] : null;
	}

	function initOptions() {
	  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultOptions;
	  return Object.assign({}, defaultOptions, props);
	}

	function isDragRelevant(_ref) {
	  var element = _ref.element,
	      options = _ref.options;
	  return function (sourceContainer, payload) {
	    if (options.shouldAcceptDrop) {
	      return options.shouldAcceptDrop(sourceContainer.getOptions(), payload);
	    }

	    var sourceOptions = sourceContainer.getOptions();
	    if (options.behaviour === 'copy') return false;
	    var parentWrapper = getParent(element, '.' + wrapperClass);

	    if (parentWrapper === sourceContainer.element) {
	      return false;
	    }

	    if (sourceContainer.element === element) return true;
	    if (sourceOptions.groupName && sourceOptions.groupName === options.groupName) return true;
	    return false;
	  };
	}

	function wrapChild(child) {
	  if (smoothDnD.wrapChild) {
	    return smoothDnD.wrapChild(child);
	  }

	  var div = global.document.createElement('div');
	  div.className = "".concat(wrapperClass);
	  child.parentElement.insertBefore(div, child);
	  div.appendChild(child);
	  return div;
	}

	function wrapChildren(element) {
	  var draggables = [];
	  Array.prototype.forEach.call(element.children, function (child) {
	    if (child.nodeType === Node.ELEMENT_NODE) {
	      var wrapper = child;

	      if (!hasClass(child, wrapperClass)) {
	        wrapper = wrapChild(child);
	      }

	      wrapper[containersInDraggable] = [];
	      wrapper[translationValue] = 0;
	      draggables.push(wrapper);
	    } else {
	      element.removeChild(child);
	    }
	  });
	  return draggables;
	}

	function unwrapChildren(element) {
	  Array.prototype.forEach.call(element.children, function (child) {
	    if (child.nodeType === Node.ELEMENT_NODE) {
	      var wrapper = child;

	      if (hasClass(child, wrapperClass)) {
	        element.insertBefore(wrapper, child.firstElementChild);
	        element.removeChild(wrapper);
	      }
	    }
	  });
	}

	function findDraggebleAtPos(_ref2) {
	  var layout = _ref2.layout;

	  var find = function find(draggables, pos, startIndex, endIndex) {
	    var withRespectToMiddlePoints = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

	    if (endIndex < startIndex) {
	      return startIndex;
	    } // binary serach draggable


	    if (startIndex === endIndex) {
	      var _layout$getBeginEnd = layout.getBeginEnd(draggables[startIndex]),
	          begin = _layout$getBeginEnd.begin,
	          end = _layout$getBeginEnd.end; // mouse pos is inside draggable
	      // now decide which index to return


	      if (pos > begin && pos <= end) {
	        if (withRespectToMiddlePoints) {
	          return pos < (end + begin) / 2 ? startIndex : startIndex + 1;
	        } else {
	          return startIndex;
	        }
	      } else {
	        return null;
	      }
	    } else {
	      var middleIndex = Math.floor((endIndex + startIndex) / 2);

	      var _layout$getBeginEnd2 = layout.getBeginEnd(draggables[middleIndex]),
	          _begin = _layout$getBeginEnd2.begin,
	          _end = _layout$getBeginEnd2.end;

	      if (pos < _begin) {
	        return find(draggables, pos, startIndex, middleIndex - 1, withRespectToMiddlePoints);
	      } else if (pos > _end) {
	        return find(draggables, pos, middleIndex + 1, endIndex, withRespectToMiddlePoints);
	      } else {
	        if (withRespectToMiddlePoints) {
	          return pos < (_end + _begin) / 2 ? middleIndex : middleIndex + 1;
	        } else {
	          return middleIndex;
	        }
	      }
	    }
	  };

	  return function (draggables, pos) {
	    var withRespectToMiddlePoints = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	    return find(draggables, pos, 0, draggables.length - 1, withRespectToMiddlePoints);
	  };
	}

	function resetDraggables(_ref3) {
	  var element = _ref3.element,
	      draggables = _ref3.draggables,
	      layout = _ref3.layout;
	  return function () {
	    draggables.forEach(function (p) {
	      setAnimation(p, false);
	      layout.setTranslation(p, 0);
	      layout.setVisibility(p, true);
	      p[containersInDraggable] = [];
	    });

	    if (element[stretcherElementInstance]) {
	      element[stretcherElementInstance].parentNode.removeChild(element[stretcherElementInstance]);
	      element[stretcherElementInstance] = null;
	    }
	  };
	}

	function setTargetContainer(draggableInfo, element) {
	  var set = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	  if (element && set) {
	    draggableInfo.targetElement = element;
	  } else {
	    if (draggableInfo.targetElement === element) {
	      draggableInfo.targetElement = null;
	    }
	  }
	}

	function handleDrop(_ref4) {
	  var element = _ref4.element,
	      draggables = _ref4.draggables,
	      layout = _ref4.layout,
	      options = _ref4.options;
	  var draggablesReset = resetDraggables({
	    element: element,
	    draggables: draggables,
	    layout: layout,
	    options: options
	  });
	  var dropHandler = (smoothDnD.dropHandler || domDropHandler)({
	    element: element,
	    draggables: draggables,
	    layout: layout,
	    options: options
	  });
	  return function (draggableInfo, _ref5) {
	    var addedIndex = _ref5.addedIndex,
	        removedIndex = _ref5.removedIndex;
	    draggablesReset(); // if drop zone is valid => complete drag else do nothing everything will be reverted by draggablesReset()

	    if (draggableInfo.targetElement || options.removeOnDropOut) {
	      var actualAddIndex = addedIndex !== null ? removedIndex !== null && removedIndex < addedIndex ? addedIndex - 1 : addedIndex : null;
	      var dropHandlerParams = {
	        removedIndex: removedIndex,
	        addedIndex: actualAddIndex,
	        payload: draggableInfo.payload,
	        droppedElement: draggableInfo.element.firstElementChild
	      };
	      dropHandler(dropHandlerParams, options.onDrop);
	    }
	  };
	}

	function getContainerProps(element, initialOptions) {
	  var options = initOptions(initialOptions);
	  var draggables = wrapChildren(element); // set flex classes before layout is inited for scroll listener

	  addClass(element, "".concat(containerClass, " ").concat(options.orientation));
	  var layout = layoutManager(element, options.orientation, options.animationDuration);
	  return {
	    element: element,
	    draggables: draggables,
	    options: options,
	    layout: layout
	  };
	}

	function getRelaventParentContainer(container, relevantContainers) {
	  var current = container.element;

	  while (current) {
	    var containerOfParentElement = getContainer(current.parentElement);

	    if (containerOfParentElement && relevantContainers.indexOf(containerOfParentElement) > -1) {
	      return {
	        container: containerOfParentElement,
	        draggable: current
	      };
	    }

	    current = current.parentElement;
	  }

	  return null;
	}

	function registerToParentContainer(container, relevantContainers) {
	  var parentInfo = getRelaventParentContainer(container, relevantContainers);

	  if (parentInfo) {
	    parentInfo.container.getChildContainers().push(container);
	    container.setParentContainer(parentInfo.container); //current should be draggable

	    parentInfo.draggable[containersInDraggable].push(container);
	  }
	}

	function getRemovedItem(_ref6) {
	  var element = _ref6.element,
	      options = _ref6.options;
	  var prevRemovedIndex = null;
	  return function (_ref7) {
	    var draggableInfo = _ref7.draggableInfo;
	    var removedIndex = prevRemovedIndex;

	    if (prevRemovedIndex == null && draggableInfo.container.element === element && options.behaviour !== 'copy') {
	      removedIndex = prevRemovedIndex = draggableInfo.elementIndex;
	    }

	    return {
	      removedIndex: removedIndex
	    };
	  };
	}

	function setRemovedItemVisibilty(_ref8) {
	  var draggables = _ref8.draggables,
	      layout = _ref8.layout;
	  return function (_ref9) {
	    var dragResult = _ref9.dragResult;

	    if (dragResult.removedIndex !== null) {
	      layout.setVisibility(draggables[dragResult.removedIndex], false);
	    }
	  };
	}

	function getPosition(_ref10) {
	  var element = _ref10.element,
	      layout = _ref10.layout;
	  return function (_ref11) {
	    var draggableInfo = _ref11.draggableInfo;
	    return {
	      pos: !getContainer(element).isPosInChildContainer() ? layout.getPosition(draggableInfo.position) : null
	    };
	  };
	}

	function notifyParentOnPositionCapture(_ref12) {
	  var element = _ref12.element;
	  var isCaptured = false;
	  return function (_ref13) {
	    var dragResult = _ref13.dragResult;

	    if (getContainer(element).getParentContainer() && isCaptured !== (dragResult.pos !== null)) {
	      isCaptured = dragResult.pos !== null;
	      getContainer(element).getParentContainer().onChildPositionCaptured(isCaptured);
	    }
	  };
	}

	function getElementSize(_ref14) {
	  var layout = _ref14.layout;
	  var elementSize = null;
	  return function (_ref15) {
	    var draggableInfo = _ref15.draggableInfo,
	        dragResult = _ref15.dragResult;

	    if (dragResult.pos === null) {
	      return elementSize = null;
	    } else {
	      elementSize = elementSize || layout.getSize(draggableInfo.element);
	    }

	    return {
	      elementSize: elementSize
	    };
	  };
	}

	function handleTargetContainer(_ref16) {
	  var element = _ref16.element;
	  return function (_ref17) {
	    var draggableInfo = _ref17.draggableInfo,
	        dragResult = _ref17.dragResult;
	    setTargetContainer(draggableInfo, element, !!dragResult.pos);
	  };
	}

	function getDragInsertionIndex(_ref18) {
	  var draggables = _ref18.draggables,
	      layout = _ref18.layout;
	  var findDraggable = findDraggebleAtPos({
	    layout: layout
	  });
	  return function (_ref19) {
	    var _ref19$dragResult = _ref19.dragResult,
	        shadowBeginEnd = _ref19$dragResult.shadowBeginEnd,
	        pos = _ref19$dragResult.pos;

	    if (!shadowBeginEnd) {
	      var index = findDraggable(draggables, pos, true);
	      return index !== null ? index : draggables.length;
	    } else {
	      if (shadowBeginEnd.begin + shadowBeginEnd.beginAdjustment <= pos && shadowBeginEnd.end >= pos) {
	        // position inside ghost
	        return null;
	      }
	    }

	    if (pos < shadowBeginEnd.begin + shadowBeginEnd.beginAdjustment) {
	      return findDraggable(draggables, pos);
	    } else if (pos > shadowBeginEnd.end) {
	      return findDraggable(draggables, pos) + 1;
	    } else {
	      return draggables.length;
	    }
	  };
	}

	function getDragInsertionIndexForDropZone() {
	  return function (_ref20) {
	    var pos = _ref20.dragResult.pos;
	    return pos !== null ? {
	      addedIndex: 0
	    } : {
	      addedIndex: null
	    };
	  };
	}

	function getShadowBeginEndForDropZone(_ref21) {
	  var draggables = _ref21.draggables,
	      layout = _ref21.layout;
	  var prevAddedIndex = null;
	  return function (_ref22) {
	    var addedIndex = _ref22.dragResult.addedIndex;

	    if (addedIndex !== prevAddedIndex) {
	      prevAddedIndex = addedIndex;

	      var _layout$getBeginEndOf = layout.getBeginEndOfContainer(),
	          begin = _layout$getBeginEndOf.begin,
	          end = _layout$getBeginEndOf.end;

	      return {
	        shadowBeginEnd: {
	          rect: layout.getTopLeftOfElementBegin(begin)
	        }
	      };
	    }

	    return null;
	  };
	}

	function invalidateShadowBeginEndIfNeeded(params) {
	  var shadowBoundsGetter = getShadowBeginEnd(params);
	  return function (_ref23) {
	    var draggableInfo = _ref23.draggableInfo,
	        dragResult = _ref23.dragResult;

	    if (draggableInfo.invalidateShadow) {
	      return shadowBoundsGetter({
	        draggableInfo: draggableInfo,
	        dragResult: dragResult
	      });
	    }

	    return null;
	  };
	}

	function getNextAddedIndex(params) {
	  var getIndexForPos = getDragInsertionIndex(params);
	  return function (_ref24) {
	    var dragResult = _ref24.dragResult;
	    var index = null;

	    if (dragResult.pos !== null) {
	      index = getIndexForPos({
	        dragResult: dragResult
	      });

	      if (index === null) {
	        index = dragResult.addedIndex;
	      }
	    }

	    return {
	      addedIndex: index
	    };
	  };
	}

	function resetShadowAdjustment() {
	  var lastAddedIndex = null;
	  return function (_ref25) {
	    var _ref25$dragResult = _ref25.dragResult,
	        addedIndex = _ref25$dragResult.addedIndex,
	        shadowBeginEnd = _ref25$dragResult.shadowBeginEnd;

	    if (addedIndex !== lastAddedIndex && lastAddedIndex !== null && shadowBeginEnd) {
	      shadowBeginEnd.beginAdjustment = 0;
	    }

	    lastAddedIndex = addedIndex;
	  };
	}

	function handleInsertionSizeChange(_ref26) {
	  var element = _ref26.element,
	      draggables = _ref26.draggables,
	      layout = _ref26.layout,
	      options = _ref26.options;
	  var strectherElement = null;
	  return function (_ref27) {
	    var _ref27$dragResult = _ref27.dragResult,
	        addedIndex = _ref27$dragResult.addedIndex,
	        removedIndex = _ref27$dragResult.removedIndex,
	        elementSize = _ref27$dragResult.elementSize;

	    if (removedIndex === null) {
	      if (addedIndex !== null) {
	        if (!strectherElement) {
	          var containerBeginEnd = layout.getBeginEndOfContainer();
	          containerBeginEnd.end = containerBeginEnd.begin + layout.getSize(element);
	          var hasScrollBar = layout.getScrollSize(element) > layout.getSize(element);
	          var containerEnd = hasScrollBar ? containerBeginEnd.begin + layout.getScrollSize(element) - layout.getScrollValue(element) : containerBeginEnd.end;
	          var lastDraggableEnd = draggables.length > 0 ? layout.getBeginEnd(draggables[draggables.length - 1]).end - draggables[draggables.length - 1][translationValue] : containerBeginEnd.begin;

	          if (lastDraggableEnd + elementSize > containerEnd) {
	            strectherElement = global.document.createElement('div');
	            strectherElement.className = stretcherElementClass + ' ' + options.orientation;
	            var stretcherSize = elementSize + lastDraggableEnd - containerEnd;
	            layout.setSize(strectherElement.style, "".concat(stretcherSize, "px"));
	            element.appendChild(strectherElement);
	            element[stretcherElementInstance] = strectherElement;
	            return {
	              containerBoxChanged: true
	            };
	          }
	        }
	      } else {
	        if (strectherElement) {
	          layout.setTranslation(strectherElement, 0);
	          var toRemove = strectherElement;
	          strectherElement = null;
	          element.removeChild(toRemove);
	          element[stretcherElementInstance] = null;
	          return {
	            containerBoxChanged: true
	          };
	        }
	      }
	    }

	    return undefined;
	  };
	}

	function calculateTranslations(_ref28) {
	  var draggables = _ref28.draggables,
	      layout = _ref28.layout;
	  var prevAddedIndex = null;
	  var prevRemovedIndex = null;
	  return function (_ref29) {
	    var _ref29$dragResult = _ref29.dragResult,
	        addedIndex = _ref29$dragResult.addedIndex,
	        removedIndex = _ref29$dragResult.removedIndex,
	        elementSize = _ref29$dragResult.elementSize;

	    if (addedIndex !== prevAddedIndex || removedIndex !== prevRemovedIndex) {
	      for (var index = 0; index < draggables.length; index++) {
	        if (index !== removedIndex) {
	          var draggable = draggables[index];
	          var translate = 0;

	          if (removedIndex !== null && removedIndex < index) {
	            translate -= layout.getSize(draggables[removedIndex]);
	          }

	          if (addedIndex !== null && addedIndex <= index) {
	            translate += elementSize;
	          }

	          layout.setTranslation(draggable, translate);
	        }
	      }

	      prevAddedIndex = addedIndex;
	      prevRemovedIndex = removedIndex;
	      return {
	        addedIndex: addedIndex,
	        removedIndex: removedIndex
	      };
	    }

	    return undefined;
	  };
	}

	function getShadowBeginEnd(_ref30) {
	  var draggables = _ref30.draggables,
	      layout = _ref30.layout;
	  var prevAddedIndex = null;
	  return function (_ref31) {
	    var draggableInfo = _ref31.draggableInfo,
	        dragResult = _ref31.dragResult;
	    var addedIndex = dragResult.addedIndex,
	        removedIndex = dragResult.removedIndex,
	        elementSize = dragResult.elementSize,
	        pos = dragResult.pos,
	        shadowBeginEnd = dragResult.shadowBeginEnd;

	    if (pos !== null) {
	      if (addedIndex !== null && (draggableInfo.invalidateShadow || addedIndex !== prevAddedIndex)) {
	        if (prevAddedIndex) prevAddedIndex = addedIndex;
	        var beforeIndex = addedIndex - 1;
	        var begin = 0;
	        var afterBounds = null;
	        var beforeBounds = null;

	        if (beforeIndex === removedIndex) {
	          beforeIndex--;
	        }

	        if (beforeIndex > -1) {
	          var beforeSize = layout.getSize(draggables[beforeIndex]);
	          beforeBounds = layout.getBeginEnd(draggables[beforeIndex]);

	          if (elementSize < beforeSize) {
	            var threshold = (beforeSize - elementSize) / 2;
	            begin = beforeBounds.end - threshold;
	          } else {
	            begin = beforeBounds.end;
	          }
	        } else {
	          beforeBounds = {
	            end: layout.getBeginEndOfContainer().begin
	          };
	        }

	        var end = 10000;
	        var afterIndex = addedIndex;

	        if (afterIndex === removedIndex) {
	          afterIndex++;
	        }

	        if (afterIndex < draggables.length) {
	          var afterSize = layout.getSize(draggables[afterIndex]);
	          afterBounds = layout.getBeginEnd(draggables[afterIndex]);

	          if (elementSize < afterSize) {
	            var _threshold = (afterSize - elementSize) / 2;

	            end = afterBounds.begin + _threshold;
	          } else {
	            end = afterBounds.begin;
	          }
	        } else {
	          afterBounds = {
	            begin: layout.getContainerRectangles().rect.end
	          };
	        }

	        var shadowRectTopLeft = beforeBounds && afterBounds ? layout.getTopLeftOfElementBegin(beforeBounds.end) : null;
	        return {
	          shadowBeginEnd: {
	            begin: begin,
	            end: end,
	            rect: shadowRectTopLeft,
	            beginAdjustment: shadowBeginEnd ? shadowBeginEnd.beginAdjustment : 0
	          }
	        };
	      } else {
	        return null;
	      }
	    } else {
	      prevAddedIndex = null;
	      return {
	        shadowBeginEnd: null
	      };
	    }
	  };
	}

	function handleFirstInsertShadowAdjustment() {
	  var lastAddedIndex = null;
	  return function (_ref32) {
	    var _ref32$dragResult = _ref32.dragResult,
	        pos = _ref32$dragResult.pos,
	        addedIndex = _ref32$dragResult.addedIndex,
	        shadowBeginEnd = _ref32$dragResult.shadowBeginEnd;

	    if (pos !== null) {
	      if (addedIndex != null && lastAddedIndex === null) {
	        if (pos < shadowBeginEnd.begin) {
	          var beginAdjustment = pos - shadowBeginEnd.begin - 5;
	          shadowBeginEnd.beginAdjustment = beginAdjustment;
	        }

	        lastAddedIndex = addedIndex;
	      }
	    } else {
	      lastAddedIndex = null;
	    }
	  };
	}

	function fireDragEnterLeaveEvents(_ref33) {
	  var options = _ref33.options;
	  var wasDragIn = false;
	  return function (_ref34) {
	    var pos = _ref34.dragResult.pos;
	    var isDragIn = !!pos;

	    if (isDragIn !== wasDragIn) {
	      wasDragIn = isDragIn;

	      if (isDragIn) {
	        options.onDragEnter && options.onDragEnter();
	      } else {
	        options.onDragLeave && options.onDragLeave();
	        return {
	          dragLeft: true
	        };
	      }
	    }

	    return undefined;
	  };
	}

	function fireOnDropReady(_ref35) {
	  var options = _ref35.options;
	  var lastAddedIndex = null;
	  return function (_ref36) {
	    var _ref36$dragResult = _ref36.dragResult,
	        addedIndex = _ref36$dragResult.addedIndex,
	        removedIndex = _ref36$dragResult.removedIndex,
	        _ref36$draggableInfo = _ref36.draggableInfo,
	        payload = _ref36$draggableInfo.payload,
	        element = _ref36$draggableInfo.element;

	    if (options.onDropReady && addedIndex !== null && lastAddedIndex !== addedIndex) {
	      lastAddedIndex = addedIndex;
	      var adjustedAddedIndex = addedIndex;

	      if (removedIndex !== null && addedIndex > removedIndex) {
	        adjustedAddedIndex--;
	      }

	      options.onDropReady({
	        addedIndex: adjustedAddedIndex,
	        removedIndex: removedIndex,
	        payload: payload,
	        element: element.firstElementChild
	      });
	    }
	  };
	}

	function getDragHandler(params) {
	  if (params.options.behaviour === 'drop-zone') {
	    // sorting is disabled in container, addedIndex will always be 0 if dropped in
	    return compose(params)(getRemovedItem, setRemovedItemVisibilty, getPosition, notifyParentOnPositionCapture, getElementSize, handleTargetContainer, getDragInsertionIndexForDropZone, getShadowBeginEndForDropZone, fireDragEnterLeaveEvents, fireOnDropReady);
	  } else {
	    return compose(params)(getRemovedItem, setRemovedItemVisibilty, getPosition, notifyParentOnPositionCapture, getElementSize, handleTargetContainer, invalidateShadowBeginEndIfNeeded, getNextAddedIndex, resetShadowAdjustment, handleInsertionSizeChange, calculateTranslations, getShadowBeginEnd, handleFirstInsertShadowAdjustment, fireDragEnterLeaveEvents, fireOnDropReady);
	  }
	}

	function getDefaultDragResult() {
	  return {
	    addedIndex: null,
	    removedIndex: null,
	    elementSize: null,
	    pos: null,
	    shadowBeginEnd: null
	  };
	}

	function compose(params) {
	  return function () {
	    for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
	      functions[_key] = arguments[_key];
	    }

	    var hydratedFunctions = functions.map(function (p) {
	      return p(params);
	    });
	    var result = null;
	    return function (draggableInfo) {
	      result = hydratedFunctions.reduce(function (dragResult, fn) {
	        return Object.assign(dragResult, fn({
	          draggableInfo: draggableInfo,
	          dragResult: dragResult
	        }));
	      }, result || getDefaultDragResult());
	      return result;
	    };
	  };
	} // Container definition begin


	function Container(element) {
	  return function (options) {
	    var dragResult = null;
	    var lastDraggableInfo = null;
	    var props = getContainerProps(element, options);
	    var dragHandler = getDragHandler(props);
	    var dropHandler = handleDrop(props);
	    var parentContainer = null;
	    var posIsInChildContainer = false;
	    var childContainers = [];

	    function processLastDraggableInfo() {
	      if (lastDraggableInfo !== null) {
	        lastDraggableInfo.invalidateShadow = true;
	        dragResult = dragHandler(lastDraggableInfo);
	        lastDraggableInfo.invalidateShadow = false;
	      }
	    }

	    function onChildPositionCaptured(isCaptured) {
	      posIsInChildContainer = isCaptured;

	      if (parentContainer) {
	        parentContainer.onChildPositionCaptured(isCaptured);

	        if (lastDraggableInfo) {
	          dragResult = dragHandler(lastDraggableInfo);
	        }
	      }
	    }

	    function _setDraggables(draggables, element) {
	      var newDraggables = wrapChildren(element);

	      for (var i = 0; i < newDraggables.length; i++) {
	        draggables[i] = newDraggables[i];
	      }

	      for (var _i = 0; _i < draggables.length - newDraggables.length; _i++) {
	        draggables.pop();
	      }
	    }

	    function prepareDrag(container, relevantContainers) {
	      var element = container.element;
	      var draggables = props.draggables;
	      var options = container.getOptions();

	      _setDraggables(draggables, element);

	      container.layout.invalidateRects();
	      registerToParentContainer(container, relevantContainers);
	      draggables.forEach(function (p) {
	        return setAnimation(p, true, options.animationDuration);
	      });
	    }

	    props.layout.setScrollListener(function () {
	      processLastDraggableInfo();
	    });

	    function handleDragLeftDeferedTranslation() {
	      if (dragResult && dragResult.dragLeft && props.options.behaviour !== 'drop-zone') {
	        dragResult.dragLeft = false;
	        setTimeout(function () {
	          if (dragResult) {
	            calculateTranslations(props)({
	              dragResult: dragResult
	            });
	          }
	        }, 20);
	      }
	    }

	    function dispose(container) {
	      unwrapChildren(container.element);
	    }

	    var container = {
	      element: element,
	      draggables: props.draggables,
	      isDragRelevant: isDragRelevant(props),
	      getScale: props.layout.getContainerScale,
	      layout: props.layout,
	      getChildContainers: function getChildContainers() {
	        return childContainers;
	      },
	      onChildPositionCaptured: onChildPositionCaptured,
	      dispose: dispose,
	      prepareDrag: prepareDrag,
	      isPosInChildContainer: function isPosInChildContainer() {
	        return posIsInChildContainer;
	      },
	      handleDrag: function handleDrag(draggableInfo) {
	        lastDraggableInfo = draggableInfo;
	        dragResult = dragHandler(draggableInfo);
	        handleDragLeftDeferedTranslation();
	        return dragResult;
	      },
	      handleDrop: function handleDrop(draggableInfo) {
	        lastDraggableInfo = null;
	        onChildPositionCaptured(false);
	        dragHandler = getDragHandler(props);
	        dropHandler(draggableInfo, dragResult);
	        dragResult = null;
	        parentContainer = null;
	        childContainers = [];
	      },
	      getDragResult: function getDragResult() {
	        return dragResult;
	      },
	      getTranslateCalculator: function getTranslateCalculator(dragresult) {
	        return calculateTranslations(props)(dragresult);
	      },
	      setParentContainer: function setParentContainer(container) {
	        parentContainer = container;
	      },
	      getParentContainer: function getParentContainer() {
	        return parentContainer;
	      },
	      onTranslated: function onTranslated() {
	        processLastDraggableInfo();
	      },
	      getOptions: function getOptions() {
	        return props.options;
	      },
	      setDraggables: function setDraggables() {
	        _setDraggables(props.draggables, element);
	      }
	    };
	    return container;
	  };
	} // const options: ContainerOptions = {
	//   behaviour: 'move',
	//   groupName: 'bla bla', // if not defined => container will not interfere with other containers
	//   orientation: 'vertical',
	//   dragHandleSelector: undefined,
	//   nonDragAreaSelector: 'some selector',
	//   dragBeginDelay: 0,
	//   animationDuration: 180,
	//   autoScrollEnabled: true,
	//   lockAxis: 'x',
	//   dragClass: undefined,
	//   dropClass: undefined,
	//   onDragStart: (index, payload) => {},
	//   onDrop: ({ removedIndex, addedIndex, payload, element }) => {},
	//   getChildPayload: index => null,
	//   shouldAnimateDrop: (sourceContainerOptions, payload) => true,
	//   shouldAcceptDrop: (sourceContainerOptions, payload) => true,
	//   onDragEnter: () => {},
	//   onDragLeave: () => { },
	//   onDropReady: ({ removedIndex, addedIndex, payload, element }) => { },
	// };
	// exported part of container


	var smoothDnD = function smoothDnD(element, options) {
	  var containerIniter = Container(element);
	  var container = containerIniter(options);
	  element[containerInstance] = container;
	  Mediator$1.register(container);
	  return {
	    dispose: function dispose() {
	      Mediator$1.unregister(container);
	      container.layout.dispose();
	      container.dispose(container);
	    }
	  };
	};

	exports.smoothDnD = smoothDnD;
	exports.constants = constants;
	exports.dropHandlers = dropHandlers;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
