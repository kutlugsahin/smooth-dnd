(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SmoothDND"] = factory();
	else
		root["SmoothDND"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: default, constants, dropHandlers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/container */ "./src/container.js");
/* harmony import */ var _src_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/constants */ "./src/constants.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "constants", function() { return _src_constants__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _src_dropHandlers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/dropHandlers */ "./src/dropHandlers.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "dropHandlers", function() { return _src_dropHandlers__WEBPACK_IMPORTED_MODULE_2__; });



/* harmony default export */ __webpack_exports__["default"] = (_src_container__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: containerInstance, containersInDraggable, defaultGroupName, wrapperClass, defaultGrabHandleClass, animationClass, translationValue, visibilityValue, ghostClass, containerClass, extraSizeForInsertion, stretcherElementClass, stretcherElementInstance, isDraggableDetached, disbaleTouchActions, noUserSelectClass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "containerInstance", function() { return containerInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "containersInDraggable", function() { return containersInDraggable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultGroupName", function() { return defaultGroupName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapperClass", function() { return wrapperClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultGrabHandleClass", function() { return defaultGrabHandleClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animationClass", function() { return animationClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "translationValue", function() { return translationValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visibilityValue", function() { return visibilityValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ghostClass", function() { return ghostClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "containerClass", function() { return containerClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extraSizeForInsertion", function() { return extraSizeForInsertion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stretcherElementClass", function() { return stretcherElementClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stretcherElementInstance", function() { return stretcherElementInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDraggableDetached", function() { return isDraggableDetached; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disbaleTouchActions", function() { return disbaleTouchActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noUserSelectClass", function() { return noUserSelectClass; });
const containerInstance = 'smooth-dnd-container-instance';
const containersInDraggable = 'smooth-dnd-containers-in-draggable';

const defaultGroupName = '@@smooth-dnd-default-group@@';
const wrapperClass = 'smooth-dnd-draggable-wrapper';
const defaultGrabHandleClass = 'smooth-dnd-default-grap-handle';
const animationClass = 'animated';
const translationValue = '__smooth_dnd_draggable_translation_value';
const visibilityValue = '__smooth_dnd_draggable_visibility_value';
const ghostClass = 'smooth-dnd-ghost';

const containerClass = 'smooth-dnd-container';

const extraSizeForInsertion = 'smooth-dnd-extra-size-for-insertion';
const stretcherElementClass = 'smooth-dnd-stretcher-element';
const stretcherElementInstance = 'smooth-dnd-stretcher-instance';

const isDraggableDetached = 'smoth-dnd-is-draggable-detached';

const disbaleTouchActions = 'smooth-dnd-disable-touch-action';
const noUserSelectClass = 'smooth-dnd-no-user-select';

/***/ }),

/***/ "./src/container.js":
/*!**************************!*\
  !*** ./src/container.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _dropHandlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dropHandlers */ "./src/dropHandlers.js");
/* harmony import */ var _dragscroller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dragscroller */ "./src/dragscroller.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _layoutManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layoutManager */ "./src/layoutManager.js");
/* harmony import */ var _mediator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mediator */ "./src/mediator.js");






// import './container.css';

const defaultOptions = {
	groupName: null,
	behaviour: 'move', // move | copy
	acceptGroups: [_constants__WEBPACK_IMPORTED_MODULE_3__["defaultGroupName"]],
	orientation: 'vertical', // vertical | horizontal
	getChildPayload: () => {
		return undefined;
	},
	animationDuration: 180
};

function setAnimation(element, add, animationDuration) {
	if (add) {
		Object(_utils__WEBPACK_IMPORTED_MODULE_0__["addClass"])(element, _constants__WEBPACK_IMPORTED_MODULE_3__["animationClass"]);
		element.style.transitionDuration = animationDuration + 'ms';
	} else {
		Object(_utils__WEBPACK_IMPORTED_MODULE_0__["removeClass"])(element, _constants__WEBPACK_IMPORTED_MODULE_3__["animationClass"]);
		element.style.transitionDuration = null;
	}
}

function getContainer(element) {
	return element ? element[_constants__WEBPACK_IMPORTED_MODULE_3__["containerInstance"]] : null;
}

function initOptions(props = defaultOptions) {
	const result = Object.assign({}, defaultOptions, props);
	if (result.groupName && !props.acceptGroups) {
		result.acceptGroups = [props.groupName];
	}
	return result;
}

function isDragRelevant({ element, options }) {
	return function (sourceContainer) {
		const sourceOptions = sourceContainer.getOptions();
		if (options.behaviour === 'copy') return false;

		const parentWrapper = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getParent"])(element, '.' + _constants__WEBPACK_IMPORTED_MODULE_3__["wrapperClass"]);
		if (parentWrapper === sourceContainer.element) {
			return false;
		}

		if (sourceContainer.element === element) return true;
		if (sourceOptions.groupName && sourceOptions.groupName === options.groupName) return true;
		if (options.acceptGroups.indexOf(sourceOptions.groupName) > -1) return true;

		return false;
	};
}

function wrapChild(child, orientation) {
	const div = document.createElement('div');
	div.className = `${_constants__WEBPACK_IMPORTED_MODULE_3__["wrapperClass"]} ${orientation} ${_constants__WEBPACK_IMPORTED_MODULE_3__["animationClass"]}`;
	child.parentElement.insertBefore(div, child);
	div.appendChild(child);
	return div;
}

function wrapChildren(element, orientation, animationDuration) {
	const draggables = Array.prototype.map.call(element.children, child => {
		let wrapper = child;
		if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__["hasClass"])(child, _constants__WEBPACK_IMPORTED_MODULE_3__["wrapperClass"])) {
			wrapper = wrapChild(child, orientation, animationDuration);
		}

		wrapper.style.transitionDuration = animationDuration + 'ms';
		wrapper[_constants__WEBPACK_IMPORTED_MODULE_3__["containersInDraggable"]] = [];
		wrapper[_constants__WEBPACK_IMPORTED_MODULE_3__["translationValue"]] = 0;
		return wrapper;
	});
	return draggables;
}

function findDraggebleAtPos({ layout }) {
	const find = (draggables, pos, startIndex, endIndex, withRespectToMiddlePoints = false) => {
		if (endIndex < startIndex) {
			return startIndex;
		}
		// binary serach draggable
		if (startIndex === endIndex) {
			let { begin, end } = layout.getBeginEnd(draggables[startIndex]);
			// mouse pos is inside draggable
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
			const middleIndex = Math.floor((endIndex + startIndex) / 2);
			const { begin, end } = layout.getBeginEnd(draggables[middleIndex]);
			if (pos < begin) {
				return find(draggables, pos, startIndex, middleIndex - 1, withRespectToMiddlePoints);
			} else if (pos > end) {
				return find(draggables, pos, middleIndex + 1, endIndex, withRespectToMiddlePoints);
			} else {
				if (withRespectToMiddlePoints) {
					return pos < (end + begin) / 2 ? middleIndex : middleIndex + 1;
				} else {
					return middleIndex;
				}
			}
		}
	};

	return (draggables, pos, withRespectToMiddlePoints = false) => {
		return find(draggables, pos, 0, draggables.length - 1, withRespectToMiddlePoints);
	};
}

function resetDraggables({ element, draggables, layout, options }) {
	return function () {
		draggables.forEach(p => {
			setAnimation(p, false);
			layout.setTranslation(p, 0);
			layout.setVisibility(p, true);
			p[_constants__WEBPACK_IMPORTED_MODULE_3__["containersInDraggable"]] = [];
		});

		if (element[_constants__WEBPACK_IMPORTED_MODULE_3__["stretcherElementInstance"]]) {
			element[_constants__WEBPACK_IMPORTED_MODULE_3__["stretcherElementInstance"]].parentNode.removeChild(element[_constants__WEBPACK_IMPORTED_MODULE_3__["stretcherElementInstance"]]);
			element[_constants__WEBPACK_IMPORTED_MODULE_3__["stretcherElementInstance"]] = null;
		}

		setTimeout(() => {
			draggables.forEach(p => {
				setAnimation(p, true, options.animationDuration);
			});
		}, 50);
	};
}

function setTargetContainer(draggableInfo, element, set = true) {
	if (element && set) {
		draggableInfo.targetElement = element;
	} else {
		if (draggableInfo.targetElement === element) {
			draggableInfo.targetElement = null;
		}
	}
}

function handleDrop({ element, draggables, layout, options }) {
	const draggablesReset = resetDraggables({ element, draggables, layout, options });
	const dropHandler = (options.dropHandler || _dropHandlers__WEBPACK_IMPORTED_MODULE_1__["domDropHandler"])({ element, draggables, layout, options });
	return function (draggableInfo, { addedIndex, removedIndex }) {
		draggablesReset();
		// if drop zone is valid => complete drag else do nothing everything will be reverted by draggablesReset()
		if (draggableInfo.targetElement) {
			let actualAddIndex = addedIndex !== null ? removedIndex !== null && removedIndex < addedIndex ? addedIndex - 1 : addedIndex : null;
			const dropHandlerParams = {
				removedIndex,
				addedIndex: actualAddIndex,
				payload: draggableInfo.payload,
				droppedElement: draggableInfo.element.firstChild
			};
			dropHandler(dropHandlerParams, options.onDrop);
			console.log(removedIndex, actualAddIndex, draggableInfo.payload, draggableInfo.element.firstChild);
		}
	};
}

function getContainerProps(element, initialOptions) {
	const options = initOptions(initialOptions);
	const draggables = wrapChildren(element, options.orientation, options.animationDuration);
	// set flex classes before layout is inited for scroll listener
	Object(_utils__WEBPACK_IMPORTED_MODULE_0__["addClass"])(element, `${_constants__WEBPACK_IMPORTED_MODULE_3__["containerClass"]} ${options.orientation}`);
	const layout = Object(_layoutManager__WEBPACK_IMPORTED_MODULE_4__["default"])(element, options.orientation, options.animationDuration);
	return {
		element,
		draggables,
		options,
		layout
	};
}

function getRelaventParentContainer(container, relevantContainers) {
	let current = container.element;
	while (current) {
		const containerOfParentElement = getContainer(current.parentElement);
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
	const parentInfo = getRelaventParentContainer(container, relevantContainers);
	if (parentInfo) {
		parentInfo.container.getChildContainers().push(container);
		container.setParentContainer(parentInfo.container);
		//current should be draggable
		parentInfo.draggable[_constants__WEBPACK_IMPORTED_MODULE_3__["containersInDraggable"]].push(container);
	}
}

function getRemovedItem({ draggables, element, options }) {
	let prevRemovedIndex = null;
	return ({ draggableInfo, dragResult }) => {
		let removedIndex = prevRemovedIndex;
		if (prevRemovedIndex == null && draggableInfo.container.element === element && options.behaviour === 'move') {
			removedIndex = prevRemovedIndex = draggableInfo.elementIndex;
		}

		return { removedIndex };
	};
}

function setRemovedItemVisibilty({ draggables, layout }) {
	return ({ draggableInfo, dragResult }) => {
		if (dragResult.removedIndex !== null) {
			layout.setVisibility(draggables[dragResult.removedIndex], false);
		}
	};
}

function getPosition({ element, layout }) {
	return ({ draggableInfo }) => {
		return {
			pos: !getContainer(element).isPosInChildContainer() ? layout.getPosition(draggableInfo.position) : null
		};
	};
}

function notifyParentOnPositionCapture({ element }) {
	let isCaptured = false;
	return ({ draggableInfo, dragResult }) => {
		if (getContainer(element).getParentContainer() && isCaptured !== (dragResult.pos !== null)) {
			isCaptured = dragResult.pos !== null;
			getContainer(element).getParentContainer().onChildPositionCaptured(isCaptured);
		}
	};
}

function getElementSize({ layout }) {
	let elementSize = null;
	return ({ draggableInfo, dragResult }) => {
		if (dragResult.pos === null) {
			return elementSize = null;
		} else {
			elementSize = elementSize || layout.getSize(draggableInfo.element);
		}
		return { elementSize };
	};
}

function handleTargetContainer({ element }) {
	return ({ draggableInfo, dragResult }) => {
		setTargetContainer(draggableInfo, element, !!dragResult.pos);
	};
}

function getDragInsertionIndex({ draggables, layout }) {
	const findDraggable = findDraggebleAtPos({ layout });
	return ({ dragResult: { shadowBeginEnd, pos } }) => {
		if (!shadowBeginEnd) {
			const index = findDraggable(draggables, pos, true);
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

function invalidateShadowBeginEndIfNeeded(params) {
	const shadowBoundsGetter = getShadowBeginEnd(params);
	return ({ draggableInfo, dragResult }) => {
		if (draggableInfo.invalidateShadow) {
			return shadowBoundsGetter({ draggableInfo, dragResult });
		}
		return null;
	};
}

function getNextAddedIndex(params) {
	const getIndexForPos = getDragInsertionIndex(params);
	return ({ dragResult }) => {
		let index = null;
		if (dragResult.pos !== null) {
			index = getIndexForPos({ dragResult });
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
	let lastAddedIndex = null;
	return ({ dragResult: { addedIndex, shadowBeginEnd } }) => {
		if (addedIndex !== lastAddedIndex && lastAddedIndex !== null && shadowBeginEnd) {
			shadowBeginEnd.beginAdjustment = 0;
		}
		lastAddedIndex = addedIndex;
	};
}

function handleInsertionSizeChange({ element, draggables, layout, options }) {
	let strectherElement = null;
	let stretcherElementAdded = false;

	return function ({ dragResult: { addedIndex, removedIndex, elementSize } }) {
		if (removedIndex === null) {
			if (addedIndex !== null) {
				if (!stretcherElementAdded) {
					const containerBeginEnd = layout.getBeginEndOfContainer();
					const hasScrollBar = layout.getScrollSize(element) > layout.getSize(element);
					const containerEnd = hasScrollBar ? containerBeginEnd.begin + layout.getScrollSize(element) - layout.getScrollValue(element) : containerBeginEnd.end;
					const lastDraggableEnd = layout.getBeginEnd(draggables[draggables.length - 1]).end - draggables[draggables.length - 1][_constants__WEBPACK_IMPORTED_MODULE_3__["translationValue"]];
					if (lastDraggableEnd + elementSize > containerEnd) {
						strectherElement = document.createElement('div');
						strectherElement.className = _constants__WEBPACK_IMPORTED_MODULE_3__["stretcherElementClass"] + ' ' + options.orientation;
						const stretcherSize = elementSize + lastDraggableEnd - containerEnd;
						layout.setSize(strectherElement.style, `${stretcherSize}px`);
						element.appendChild(strectherElement);
						element[_constants__WEBPACK_IMPORTED_MODULE_3__["stretcherElementInstance"]] = strectherElement;
					}
					stretcherElementAdded = true;
					setTimeout(() => {
						layout.invalidateRects();
					}, 100);
				}
			} else {
				if (strectherElement) {
					layout.setTranslation(strectherElement, 0);
					let toRemove = strectherElement;
					strectherElement = null;
					element.removeChild(toRemove);
					element[_constants__WEBPACK_IMPORTED_MODULE_3__["stretcherElementInstance"]] = null;
				}
				stretcherElementAdded = false;
				setTimeout(() => {
					layout.invalidateRects();
				}, 100);
			}
		}
	};
}

function calculateTranslations({ element, draggables, layout }) {
	let prevAddedIndex = null;
	let prevRemovedIndex = null;
	return function ({ dragResult: { addedIndex, removedIndex, elementSize } }) {
		if (addedIndex !== prevAddedIndex || removedIndex !== prevRemovedIndex) {
			for (let index = 0; index < draggables.length; index++) {
				if (index !== removedIndex) {
					const draggable = draggables[index];
					let translate = 0;
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

			return { addedIndex, removedIndex };
		}
	};
}

function getShadowBeginEnd({ draggables, layout }) {
	let prevAddedIndex = null;
	return ({ draggableInfo, dragResult }) => {
		const { addedIndex, removedIndex, elementSize, pos, shadowBeginEnd } = dragResult;
		if (pos !== null) {
			if (addedIndex !== null && (draggableInfo.invalidateShadow || addedIndex !== prevAddedIndex)) {
				if (prevAddedIndex) prevAddedIndex = addedIndex;
				let beforeIndex = addedIndex - 1;
				let begin = 0;
				let afterBounds = null;
				let beforeBounds = null;
				if (beforeIndex === removedIndex) {
					beforeIndex--;
				}
				if (beforeIndex > -1) {
					const beforeSize = layout.getSize(draggables[beforeIndex]);
					beforeBounds = layout.getBeginEnd(draggables[beforeIndex]);
					if (elementSize < beforeSize) {
						const threshold = (beforeSize - elementSize) / 2;
						begin = beforeBounds.end - threshold;
					} else {
						begin = beforeBounds.end;
					}
				} else {
					beforeBounds = { end: layout.getBeginEndOfContainer().begin };
				}

				let end = 10000;
				let afterIndex = addedIndex;
				if (afterIndex === removedIndex) {
					afterIndex++;
				}
				if (afterIndex < draggables.length) {
					const afterSize = layout.getSize(draggables[afterIndex]);
					afterBounds = layout.getBeginEnd(draggables[afterIndex]);

					if (elementSize < afterSize) {
						const threshold = (afterSize - elementSize) / 2;
						end = afterBounds.begin + threshold;
					} else {
						end = afterBounds.begin;
					}
				} else {
					afterBounds = { begin: layout.getContainerRectangles().end };
				}

				const shadowRectTopLeft = beforeBounds && afterBounds ? layout.getTopLeftOfElementBegin(beforeBounds.end, afterBounds.begin) : null;

				return {
					shadowBeginEnd: {
						begin,
						end,
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
	let lastAddedIndex = null;
	return ({ dragResult: { pos, addedIndex, shadowBeginEnd }, draggableInfo: { invalidateShadow } }) => {
		if (pos !== null) {
			if (addedIndex != null && lastAddedIndex === null) {
				if (pos < shadowBeginEnd.begin) {
					const beginAdjustment = pos - shadowBeginEnd.begin - 5;
					shadowBeginEnd.beginAdjustment = beginAdjustment;
				}
				lastAddedIndex = addedIndex;
			}
		} else {
			lastAddedIndex = null;
		}
	};
}

function getDragHandler(params) {
	return compose(params)(getRemovedItem, setRemovedItemVisibilty, getPosition, notifyParentOnPositionCapture, getElementSize, handleTargetContainer, invalidateShadowBeginEndIfNeeded, getNextAddedIndex, resetShadowAdjustment, handleInsertionSizeChange, calculateTranslations, getShadowBeginEnd, handleFirstInsertShadowAdjustment);
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
	return (...functions) => {
		const hydratedFunctions = functions.map(p => p(params));
		let result = null;
		return draggableInfo => {
			result = hydratedFunctions.reduce((dragResult, fn) => {
				return Object.assign(dragResult, fn({ draggableInfo, dragResult }));
			}, result || getDefaultDragResult());
			return result;
		};
	};
}

// Container definition begin
function Container(element) {
	return function (options) {
		let dragResult = null;
		let lastDraggableInfo = null;
		const props = getContainerProps(element, options);
		let dragHandler = getDragHandler(props);
		let dropHandler = handleDrop(props);
		let handleScrollOnDrag = Object(_dragscroller__WEBPACK_IMPORTED_MODULE_2__["default"])(props);
		let parentContainer = null;
		let posIsInChildContainer = false;
		let childContainers = [];

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

		function prepareDrag(container, relevantContainers) {
			const element = container.element;
			const draggables = props.draggables;
			const options = container.getOptions();
			const newDraggables = wrapChildren(element, options.orientation, options.animationDuration);
			for (let i = 0; i < newDraggables.length; i++) {
				draggables[i] = newDraggables[i];
			}

			for (let i = 0; i < draggables.length - newDraggables.length; i++) {
				draggables.pop();
			}

			container.layout.invalidateRects();
			registerToParentContainer(container, relevantContainers);
		}

		props.layout.setScrollListener(function () {
			processLastDraggableInfo();
		});

		function dispose(container) {
			// additional dispose actions
		}

		return {
			element,
			draggables: props.draggables,
			isDragRelevant: isDragRelevant(props),
			getScale: props.layout.getContainerScale,
			getChildPayload: props.options.getChildPayload,
			groupName: props.options.groupName,
			layout: props.layout,
			getChildContainers: () => childContainers,
			onChildPositionCaptured,
			dispose,
			prepareDrag,
			isPosInChildContainer: () => posIsInChildContainer,
			handleDrag: function (draggableInfo) {
				lastDraggableInfo = draggableInfo;
				dragResult = dragHandler(draggableInfo);
				// console.log(dragResult);
				handleScrollOnDrag({ draggableInfo, dragResult });
			},
			handleDrop: function (draggableInfo) {
				lastDraggableInfo = null;
				onChildPositionCaptured(false);
				dragHandler = getDragHandler(props);
				dropHandler(draggableInfo, dragResult);
				handleScrollOnDrag({ reset: true });
				handleScrollOnDrag = Object(_dragscroller__WEBPACK_IMPORTED_MODULE_2__["default"])(props);
				parentContainer = null;
				childContainers = [];
			},
			getDragResult: function () {
				return dragResult;
			},
			getTranslateCalculator: function (...params) {
				return calculateTranslations(props)(...params);
			},
			setParentContainer: e => {
				parentContainer = e;
			},
			getParentContainer: () => parentContainer,
			onTranslated: () => {
				processLastDraggableInfo();
			},
			getOptions: () => props.options
		};
	};
}

const options = {
	onDragStart: itemIndex => {},
	onDragMove: () => {},
	onDrop: () => {},
	behaviour: 'move',
	groupName: 'bla bla', // if not defined => container will not interfere with other containers
	acceptGroups: [],
	orientation: 'vertical',
	dragHandleSelector: null,
	nonDragAreaSelector: 'some selector',
	dragBeginDelay: 0,
	animationDuration: 180,
	getChildPayload: index => null
};

// exported part of container
/* harmony default export */ __webpack_exports__["default"] = (function (element, options) {
	const containerIniter = Container(element);
	const container = containerIniter(options);
	element[_constants__WEBPACK_IMPORTED_MODULE_3__["containerInstance"]] = container;
	_mediator__WEBPACK_IMPORTED_MODULE_5__["default"].register(container);
	return {
		setOptions: containerIniter,
		dispose: function () {
			_mediator__WEBPACK_IMPORTED_MODULE_5__["default"].unregister(container);
			container.layout.dispose();
			container.dispose(container);
		}
	};
});

/***/ }),

/***/ "./src/dragscroller.js":
/*!*****************************!*\
  !*** ./src/dragscroller.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");


const maxSpeed = 1500; // px/s
const minSpeed = 20; // px/s

function getScrollableParent(element, axis) {
	let current = element;
	while (current) {
		if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isScrolling"])(current)) {
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
			request = requestAnimationFrame(timestamp => {
				if (startTime === null) {
					startTime = timestamp;
				}
				const timeDiff = timestamp - startTime;
				startTime = timestamp;
				let distanceDiff = timeDiff / 1000 * speed;
				distanceDiff = direction === 'begin' ? 0 - distanceDiff : distanceDiff;
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

/* harmony default export */ __webpack_exports__["default"] = (({ element, layout, options }) => {
	let lastPos = null;
	const axis = options.orientation === 'vertical' ? 'Y' : 'X';
	let scrollableParent = getScrollableParent(element, axis);
	const scrollParentBeginEnd = layout.getBeginEndOfDOMRect(scrollableParent.getBoundingClientRect());
	let animator = requestFrame(element, layout);
	return ({ draggableInfo, dragResult, reset }) => {
		if (scrollableParent) {
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
});

/***/ }),

/***/ "./src/dropHandlers.js":
/*!*****************************!*\
  !*** ./src/dropHandlers.js ***!
  \*****************************/
/*! exports provided: domDropHandler, reactDropHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "domDropHandler", function() { return domDropHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reactDropHandler", function() { return reactDropHandler; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.js");



function domDropHandler({ element, draggables, layout, options }) {
	return (dropResult, onDrop) => {
		const { removedIndex, addedIndex, droppedElement } = dropResult;
		if (removedIndex !== null) {
			Object(_utils__WEBPACK_IMPORTED_MODULE_0__["removeChildAt"])(element, removedIndex);
			draggables.splice(removedIndex, 1);
		}

		if (addedIndex !== null) {
			const wrapper = document.createElement('div');
			wrapper.className = `${_constants__WEBPACK_IMPORTED_MODULE_1__["wrapperClass"]} ${options.orientation} ${_constants__WEBPACK_IMPORTED_MODULE_1__["animationClass"]} `;
			wrapper.appendChild(droppedElement.cloneNode(true));
			wrapper[_constants__WEBPACK_IMPORTED_MODULE_1__["containersInDraggable"]] = [];
			Object(_utils__WEBPACK_IMPORTED_MODULE_0__["addChildAt"])(element, wrapper, addedIndex);
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
	const handler = ({ element, draggables, layout, options }) => {
		return (dropResult, onDrop) => {
			if (onDrop) {
				onDrop(dropResult);
			}
		};
	};

	return {
		handler
	};
}

/***/ }),

/***/ "./src/layoutManager.js":
/*!******************************!*\
  !*** ./src/layoutManager.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return layoutManager; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.js");



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
		'translate': val => `translate3d(${val}px, 0, 0)`
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
		'translate': val => `translate3d(0,${val}px, 0)`
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

function layoutManager(containerElement, orientation, _animationDuration) {
	containerElement[_constants__WEBPACK_IMPORTED_MODULE_1__["extraSizeForInsertion"]] = 0;
	const animationDuration = _animationDuration;
	const map = orientation === 'horizontal' ? horizontalMap : verticalMap;
	const propMapper = orientationDependentProps(map);
	const values = {
		translation: 0
	};
	let registeredScrollListener = null;

	window.addEventListener('resize', function () {
		invalidateContainerRectangles(containerElement);
		// invalidateContainerScale(containerElement);
	});

	setTimeout(() => {
		invalidate();
	}, 10);
	// invalidate();

	const scrollListener = _utils__WEBPACK_IMPORTED_MODULE_0__["listenScrollParent"](containerElement, function () {
		invalidateContainerRectangles(containerElement);
		registeredScrollListener && registeredScrollListener();
	});
	function invalidate() {
		invalidateContainerRectangles(containerElement);
		invalidateContainerScale(containerElement);
	}

	let visibleRect;
	function invalidateContainerRectangles(containerElement) {
		values.rect = _utils__WEBPACK_IMPORTED_MODULE_0__["getContainerRect"](containerElement);
		values.visibleRect = _utils__WEBPACK_IMPORTED_MODULE_0__["getVisibleRect"](containerElement, values.rect);

		// if (visibleRect) {
		//   visibleRect.parentNode.removeChild(visibleRect);
		// }
		// visibleRect = document.createElement('div');
		// visibleRect.style.position = 'fixed';
		// visibleRect.style.border = '1px solid red';
		// visibleRect.style.top = values.visibleRect.top + 'px';
		// visibleRect.style.left = values.visibleRect.left + 'px';
		// visibleRect.style.width = values.visibleRect.right - values.visibleRect.left + 'px';
		// visibleRect.style.height = values.visibleRect.bottom - values.visibleRect.top + 'px';
		// document.body.appendChild(visibleRect);
	}

	function invalidateContainerScale(containerElement) {
		const rect = containerElement.getBoundingClientRect();
		values.scaleX = (rect.right - rect.left) / containerElement.offsetWidth;
		values.scaleY = (rect.bottom - rect.top) / containerElement.offsetHeight;
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
		const distance = propMapper.get(element, 'distanceToParent') + (element[_constants__WEBPACK_IMPORTED_MODULE_1__["translationValue"]] || 0);
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
		if (getTranslation(element) !== translation) {
			propMapper.set(element.style, 'translate', translation);
			element[_constants__WEBPACK_IMPORTED_MODULE_1__["translationValue"]] = translation;

			if (element[_constants__WEBPACK_IMPORTED_MODULE_1__["containersInDraggable"]]) {
				setTimeout(() => {
					element[_constants__WEBPACK_IMPORTED_MODULE_1__["containersInDraggable"]].forEach(p => {
						updateDescendantContainerRects(p);
					});
				}, animationDuration + 20);
			}
		}
	}

	function getTranslation(element) {
		return element[_constants__WEBPACK_IMPORTED_MODULE_1__["translationValue"]];
	}

	function setVisibility(element, isVisible) {
		if (element[_constants__WEBPACK_IMPORTED_MODULE_1__["visibilityValue"]] === undefined || element[_constants__WEBPACK_IMPORTED_MODULE_1__["visibilityValue"]] !== isVisible) {
			element.style.visibility = isVisible ? 'inherit' : 'hidden';
			element[_constants__WEBPACK_IMPORTED_MODULE_1__["visibilityValue"]] = isVisible;
		}
	}

	function isVisible(element) {
		return element[_constants__WEBPACK_IMPORTED_MODULE_1__["visibilityValue"]] === undefined || element[_constants__WEBPACK_IMPORTED_MODULE_1__["visibilityValue"]];
	}

	function isInVisibleRect(x, y) {
		const { left, top, right, bottom } = values.visibleRect;
		if (orientation === 'vertical') {
			return x > left && x < right && y > top && y < bottom;
		} else {
			return x > left && x < right && y > top && y < bottom;
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
		getPosition
	};
}

/***/ }),

/***/ "./src/mediator.js":
/*!*************************!*\
  !*** ./src/mediator.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles */ "./src/styles.js");




const grabEvents = ['mousedown', 'touchstart'];
const moveEvents = ['mousemove', 'touchmove'];
const releaseEvents = ['mouseup', 'touchend'];

let dragListeningContainers = null;
let grabbedElement = null;
let ghostInfo = null;
let draggableInfo = null;
let containers = [];
let isDragging = false;

// Utils.addClass(document.body, 'clearfix');

const isMobile = _utils__WEBPACK_IMPORTED_MODULE_0__["isMobile"]();

function listenEvents() {
	addGrabListeners();
}

function addGrabListeners() {
	grabEvents.forEach(e => {
		window.document.addEventListener(e, onMouseDown, { passive: false });
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
	if (container.getOptions().dragClass) {
		_utils__WEBPACK_IMPORTED_MODULE_0__["addClass"](element.childNodes[0], container.getOptions().dragClass);
	}
	const midX = left + (right - left) / 2;
	const midY = top + (bottom - top) / 2;
	const div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.pointerEvents = 'none';
	div.style.left = left + 'px';
	div.style.top = top + 'px';
	div.style.width = right - left + 'px';
	div.style.height = bottom - top + 'px';
	div.style.overflow = 'hidden';
	div.className = _constants__WEBPACK_IMPORTED_MODULE_1__["ghostClass"];
	const clone = element.cloneNode(true);
	clone.style.width = (right - left) / scaleX + 'px';
	clone.style.height = (bottom - top) / scaleY + 'px';
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
		_utils__WEBPACK_IMPORTED_MODULE_0__["removeClass"](ghostInfo.ghost, 'animated');
		ghostInfo.ghost.style.transitionDuration = null;
		document.body.removeChild(ghostInfo.ghost);
		callback();
	}

	function animateGhostToPosition({ top, left }, duration) {
		_utils__WEBPACK_IMPORTED_MODULE_0__["addClass"](ghostInfo.ghost, 'animated');
		ghostInfo.ghost.style.transitionDuration = duration + 'ms';
		ghostInfo.ghost.style.left = left + 'px';
		ghostInfo.ghost.style.top = top + 'px';
		setTimeout(function () {
			endDrop();
		}, duration + 10);
	}

	if (draggableInfo.targetElement) {
		const container = containers.filter(p => p.element === draggableInfo.targetElement)[0];
		const dragResult = container.getDragResult();
		animateGhostToPosition(dragResult.shadowBeginEnd.rect, Math.max(150, container.getOptions().animationDuration / 2));
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
			_utils__WEBPACK_IMPORTED_MODULE_0__["addClass"](ghostInfo.ghost, 'animated');
			ghostInfo.ghost.style.transitionDuration = container.getOptions().animationDuration + 'ms';
			ghostInfo.ghost.style.opacity = '0';
			ghostInfo.ghost.style.transform = 'scale(0.90)';
			setTimeout(function () {
				endDrop();
			}, container.getOptions().animationDuration);
		}
	}
}

const handleDragStartConditions = function handleDragStartConditions() {
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

	return function (_startEvent, _delay, _clb) {
		startEvent = getPointerEvent(_startEvent);
		delay = _delay || (isMobile ? 200 : 0);
		clb = _clb;

		registerEvents();
	};
}();

function onMouseDown(event) {
	const e = getPointerEvent(event);
	if (!isDragging) {
		grabbedElement = _utils__WEBPACK_IMPORTED_MODULE_0__["getParent"](e.target, '.' + _constants__WEBPACK_IMPORTED_MODULE_1__["wrapperClass"]);
		if (grabbedElement) {
			const containerElement = _utils__WEBPACK_IMPORTED_MODULE_0__["getParent"](grabbedElement, '.' + _constants__WEBPACK_IMPORTED_MODULE_1__["containerClass"]);
			const container = containers.filter(p => p.element === containerElement)[0];
			const dragHandleSelector = container.getOptions().dragHandleSelector;
			const nonDragAreaSelector = container.getOptions().nonDragAreaSelector;

			let startDrag = true;
			if (dragHandleSelector && !_utils__WEBPACK_IMPORTED_MODULE_0__["getParent"](e.target, dragHandleSelector)) {
				startDrag = false;
			}

			if (nonDragAreaSelector && _utils__WEBPACK_IMPORTED_MODULE_0__["getParent"](e.target, nonDragAreaSelector)) {
				startDrag = false;
			}

			if (startDrag) {
				event.preventDefault();
				handleDragStartConditions(e, container.getOptions().dragBeginDelay, () => {
					setTimeout(() => {
						window.getSelection().empty();
					}, 0);
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
				_utils__WEBPACK_IMPORTED_MODULE_0__["removeClass"](p.element, _constants__WEBPACK_IMPORTED_MODULE_1__["noUserSelectClass"]);
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

function onMouseMove(event) {
	event.preventDefault();
	const e = getPointerEvent(event);
	if (!draggableInfo) {
		isDragging = true;
		const container = containers.filter(p => grabbedElement.parentElement === p.element)[0];
		dragListeningContainers = containers.filter(p => p.isDragRelevant(container));
		dragListeningContainers.forEach(p => _utils__WEBPACK_IMPORTED_MODULE_0__["addClass"](p.element, _constants__WEBPACK_IMPORTED_MODULE_1__["noUserSelectClass"]));
		dragListeningContainers.forEach(p => p.prepareDrag(p, dragListeningContainers));

		// first move after grabbing  draggable
		draggableInfo = getDraggableInfo(grabbedElement);
		ghostInfo = getGhostElement(grabbedElement, { x: e.clientX, y: e.clientY }, draggableInfo.container);
		draggableInfo.position = {
			x: e.clientX + ghostInfo.centerDelta.x,
			y: e.clientY + ghostInfo.centerDelta.y
		};

		document.body.appendChild(ghostInfo.ghost);
	} else {
		// just update ghost position && draggableInfo position
		ghostInfo.ghost.style.left = `${e.clientX + ghostInfo.positionDelta.left}px`;
		ghostInfo.ghost.style.top = `${e.clientY + ghostInfo.positionDelta.top}px`;
		draggableInfo.position.x = e.clientX + ghostInfo.centerDelta.x;
		draggableInfo.position.y = e.clientY + ghostInfo.centerDelta.y;
		draggableInfo.clientWidth = ghostInfo.clientWidth;
		draggableInfo.clientHeight = ghostInfo.clientHeight;
	}

	dragListeningContainers.forEach(p => p.handleDrag(draggableInfo));
}

function Mediator() {
	listenEvents();
	return {
		register: function (container) {
			containers.push(container);
		},
		unregister: function (container) {
			containers.splice(containers.indexOf(container), 1);
		}
	};
}

Object(_styles__WEBPACK_IMPORTED_MODULE_2__["addStyleToHead"])();

/* harmony default export */ __webpack_exports__["default"] = (Mediator());

/***/ }),

/***/ "./src/styles.js":
/*!***********************!*\
  !*** ./src/styles.js ***!
  \***********************/
/*! exports provided: addStyleToHead */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addStyleToHead", function() { return addStyleToHead; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");


const css = {
	[`.${_constants__WEBPACK_IMPORTED_MODULE_0__["containerClass"]}`]: {
		'position': 'relative'
	},
	[`.${_constants__WEBPACK_IMPORTED_MODULE_0__["containerClass"]} *`]: {
		'box-sizing': 'border-box'
	},
	[`.${_constants__WEBPACK_IMPORTED_MODULE_0__["containerClass"]}.horizontal`]: {
		'white-space': 'nowrap'
	},
	[`.${_constants__WEBPACK_IMPORTED_MODULE_0__["containerClass"]}.horizontal .${_constants__WEBPACK_IMPORTED_MODULE_0__["wrapperClass"]}`]: {
		'height': '100%',
		'display': 'inline-block'
	},
	[`.${_constants__WEBPACK_IMPORTED_MODULE_0__["wrapperClass"]}`]: {
		'overflow': 'hidden'
	},
	[`.${_constants__WEBPACK_IMPORTED_MODULE_0__["wrapperClass"]}.animated`]: {
		'transition': 'transform ease'
	},
	[`.${_constants__WEBPACK_IMPORTED_MODULE_0__["ghostClass"]} *`]: {
		'box-sizing': 'border-box'
	},
	[`.${_constants__WEBPACK_IMPORTED_MODULE_0__["ghostClass"]}.animated`]: {
		'transition': 'all ease-out'
	},
	[`.${_constants__WEBPACK_IMPORTED_MODULE_0__["disbaleTouchActions"]} *`]: {
		'touch-actions': 'none',
		'-ms-touch-actions': 'none'
	}
};

function convertToCssString(css) {
	return Object.entries(css).reduce((styleString, [propName, propValue]) => {
		if (typeof propValue === 'object') {
			return `${styleString}${propName}{${convertToCssString(propValue)}}`;
		}
		return `${styleString}${propName}:${propValue};`;
	}, '');
}

function addStyleToHead() {
	const head = document.head || document.getElementsByTagName('head')[0];
	const style = document.createElement('style');
	const cssString = convertToCssString(css);
	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = cssString;
	} else {
		style.appendChild(document.createTextNode(cssString));
	}

	head.appendChild(style);
}



/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: getIntersection, getIntersectionOnAxis, getContainerRect, isScrolling, isScrollingOrHidden, hasBiggerChild, hasScrollBar, getVisibleRect, listenScrollParent, hasParent, getParent, hasClass, addClass, removeClass, debounce, removeChildAt, addChildAt, isMobile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIntersection", function() { return getIntersection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIntersectionOnAxis", function() { return getIntersectionOnAxis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getContainerRect", function() { return getContainerRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isScrolling", function() { return isScrolling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isScrollingOrHidden", function() { return isScrollingOrHidden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasBiggerChild", function() { return hasBiggerChild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasScrollBar", function() { return hasScrollBar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVisibleRect", function() { return getVisibleRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listenScrollParent", function() { return listenScrollParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasParent", function() { return hasParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParent", function() { return getParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasClass", function() { return hasClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return removeClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeChildAt", function() { return removeChildAt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addChildAt", function() { return addChildAt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobile", function() { return isMobile; });
var _this = undefined;

const getIntersection = (rect1, rect2) => {
  return {
    left: Math.max(rect1.left, rect2.left),
    top: Math.max(rect1.top, rect2.top),
    right: Math.min(rect1.right, rect2.right),
    bottom: Math.min(rect1.bottom, rect2.bottom)
  };
};

const getIntersectionOnAxis = (rect1, rect2, axis) => {
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

const getContainerRect = element => {
  const _rect = element.getBoundingClientRect();
  const rect = {
    left: _rect.left,
    right: _rect.right + 10,
    top: _rect.top,
    bottom: _rect.bottom
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

const isScrolling = (element, axis) => {
  const style = window.getComputedStyle(element);
  const overflow = style['overflow'];
  const overFlowAxis = style[`overflow-${axis}`];
  const general = overflow === 'auto' || overflow === 'scroll';
  const dimensionScroll = overFlowAxis === 'auto' || overFlowAxis === 'scroll';
  return general || dimensionScroll;
};

const isScrollingOrHidden = (element, axis) => {
  const style = window.getComputedStyle(element);
  const overflow = style['overflow'];
  const overFlowAxis = style[`overflow-${axis}`];
  const general = overflow === 'auto' || overflow === 'scroll' || overflow === 'hidden';
  const dimensionScroll = overFlowAxis === 'auto' || overFlowAxis === 'scroll' || overFlowAxis === 'hidden';
  return general || dimensionScroll;
};

const hasBiggerChild = (element, axis) => {
  if (axis === 'x') {
    return element.scrollWidth > element.clientWidth;
  } else {
    return element.scrollHeight > element.clientHeight;
  }
};

const hasScrollBar = (element, axis) => {
  return hasBiggerChild(element, axis) && isScrolling(element, axis);
};

const getVisibleRect = (element, elementRect) => {
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
};

const listenScrollParent = (element, clb) => {
  let scrollers = [];
  const dispose = () => {
    scrollers.forEach(p => {
      p.removeEventListener('scroll', clb);
    });
    window.removeEventListener('scroll', clb);
  };

  setTimeout(function () {
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
  };
};

const hasParent = (element, parent) => {
  let current = element;
  while (current) {
    if (current === parent) {
      return true;
    }
    current = current.parentElement;
  }
  return false;
};

const getParent = (element, selector) => {
  let current = element;
  while (current) {
    if (current.matches(selector)) {
      return current;
    }
    current = current.parentElement;
  }

  return null;
};

const hasClass = (element, cls) => {
  return element.className.split(' ').map(p => p).indexOf(cls) > -1;
};

const addClass = (element, cls) => {
  const classes = element.className.split(' ').filter(p => p);
  if (classes.indexOf(cls) === -1) {
    classes.push(cls);
    element.className = classes.join(' ');
  }
};

const removeClass = (element, cls) => {
  const classes = element.className.split(' ').filter(p => p && p !== cls);
  element.className = classes.join(' ');
};

const debounce = (fn, delay, immediate) => {
  let timer = null;
  return (...params) => {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate && !timer) {
      fn.call(_this, ...params);
    } else {
      timer = setTimeout(() => {
        timer = null;
        fn.call(_this, ...params);
      }, delay);
    }
  };
};

const removeChildAt = (parent, index) => {
  return parent.removeChild(parent.children[index]);
};

const addChildAt = (parent, child, index) => {
  if (index >= parent.children.lenght) {
    parent.appendChild(child);
  } else {
    parent.insertBefore(child, parent.children[index]);
  }
};

const isMobile = () => {
  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
    return true;
  } else {
    return false;
  }
};

/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map