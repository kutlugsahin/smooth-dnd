!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.SmoothDnD=t():e.SmoothDnD=t()}(this,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";var r,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(e){"object"===("undefined"==typeof window?"undefined":o(window))&&(r=window)}e.exports=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.containerInstance="smooth-dnd-container-instance",t.containersInDraggable="smooth-dnd-containers-in-draggable",t.wrapperClass="smooth-dnd-draggable-wrapper",t.defaultGrabHandleClass="smooth-dnd-default-grap-handle",t.animationClass="animated",t.translationValue="__smooth_dnd_draggable_translation_value",t.visibilityValue="__smooth_dnd_draggable_visibility_value",t.ghostClass="smooth-dnd-ghost",t.containerClass="smooth-dnd-container",t.extraSizeForInsertion="smooth-dnd-extra-size-for-insertion",t.stretcherElementClass="smooth-dnd-stretcher-element",t.stretcherElementInstance="smooth-dnd-stretcher-instance",t.isDraggableDetached="smoth-dnd-is-draggable-detached",t.disbaleTouchActions="smooth-dnd-disable-touch-action",t.noUserSelectClass="smooth-dnd-no-user-select"},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});t.getIntersection=function(e,t){return{left:Math.max(e.left,t.left),top:Math.max(e.top,t.top),right:Math.min(e.right,t.right),bottom:Math.min(e.bottom,t.bottom)}};var n=t.getIntersectionOnAxis=function(e,t,n){return"x"===n?{left:Math.max(e.left,t.left),top:e.top,right:Math.min(e.right,t.right),bottom:e.bottom}:{left:e.left,top:Math.max(e.top,t.top),right:e.right,bottom:Math.min(e.bottom,t.bottom)}},r=t.getContainerRect=function(e){var t=e.getBoundingClientRect(),n={left:t.left,right:t.right+10,top:t.top,bottom:t.bottom};if(a(e,"x")&&!i(e,"x")){var r=n.right-n.left;n.right=n.right+e.scrollWidth-r}if(a(e,"y")&&!i(e,"y")){var o=n.bottom-n.top;n.bottom=n.bottom+e.scrollHeight-o}return n},o=(t.getScrollingAxis=function(t){var n=e.getComputedStyle(t),r=n.overflow;if("auto"===r||"scroll"===r)return"xy";var o=n["overflow-x"],i="auto"===o||"scroll"===o,a=n["overflow-y"];return(i?"x":"")+("auto"===a||"scroll"===a?"y":"")||null},function(t,n){var r=e.getComputedStyle(t),o=r.overflow,i=r["overflow-"+n];return"auto"===o||"scroll"===o||("auto"===i||"scroll"===i)}),i=function(t,n){var r=e.getComputedStyle(t),o=r.overflow,i=r["overflow-"+n];return"auto"===o||"scroll"===o||"hidden"===o||("auto"===i||"scroll"===i||"hidden"===i)},a=t.hasBiggerChild=function(e,t){return"x"===t?e.scrollWidth>e.clientWidth:e.scrollHeight>e.clientHeight};t.hasScrollBar=function(e,t){return a(e,t)&&o(e,t)},t.getVisibleRect=function(e,t){var o=e,l=t||r(e);for(o=e.parentElement;o;)a(o,"x")&&i(o,"x")&&(l=n(l,o.getBoundingClientRect(),"x")),a(o,"y")&&i(o,"y")&&(l=n(l,o.getBoundingClientRect(),"y")),o=o.parentElement;return l},t.listenScrollParent=function(t,n){var r=[];return setTimeout(function(){for(var i=t;i;)(o(i,"x")||o(i,"y"))&&(i.addEventListener("scroll",n),r.push(i)),i=i.parentElement;e.addEventListener("scroll",n)},10),{dispose:function(){r.forEach(function(e){e.removeEventListener("scroll",n)}),e.removeEventListener("scroll",n)}}},t.hasParent=function(e,t){for(var n=e;n;){if(n===t)return!0;n=n.parentElement}return!1},t.getParent=function(e,t){for(var n=e;n;){if(n.matches(t))return n;n=n.parentElement}return null},t.hasClass=function(e,t){return e.className.split(" ").map(function(e){return e}).indexOf(t)>-1},t.addClass=function(e,t){if(e){var n=e.className.split(" ").filter(function(e){return e});-1===n.indexOf(t)&&(n.unshift(t),e.className=n.join(" "))}},t.removeClass=function(e,t){if(e){var n=e.className.split(" ").filter(function(e){return e&&e!==t});e.className=n.join(" ")}},t.removeChildAt=function(e,t){return e.removeChild(e.children[t])},t.addChildAt=function(e,t,n){n>=e.children.lenght?e.appendChild(t):e.insertBefore(t,e.children[n])},t.isMobile=function(){return"undefined"!=typeof window&&!!(e.navigator.userAgent.match(/Android/i)||e.navigator.userAgent.match(/webOS/i)||e.navigator.userAgent.match(/iPhone/i)||e.navigator.userAgent.match(/iPad/i)||e.navigator.userAgent.match(/iPod/i)||e.navigator.userAgent.match(/BlackBerry/i)||e.navigator.userAgent.match(/Windows Phone/i))},t.clearSelection=function(){e.getSelection?e.getSelection().empty?e.getSelection().empty():e.getSelection().removeAllRanges&&e.getSelection().removeAllRanges():e.document.selection&&e.document.selection.empty()},t.getElementCursor=function(t){if(t){var n=e.getComputedStyle(t);if(n)return n.cursor}return null}}).call(this,n(0))},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.domDropHandler=function(t){var n=t.element,i=t.draggables,a=t.options;return function(t,l){var u=t.removedIndex,s=t.addedIndex,c=t.droppedElement,d=null;if(null!==u&&(d=(0,r.removeChildAt)(n,u),i.splice(u,1)),null!==s){var f=e.document.createElement("div");f.className=""+o.wrapperClass,f.appendChild(d&&d.firstElementChild?d.firstElementChild:"move"===a.behaviour?c:c.cloneNode(!0)),f[o.containersInDraggable]=[],(0,r.addChildAt)(n,f,s),s>=i.length?i.push(f):i.splice(s,0,f)}l&&l(t)}},t.reactDropHandler=function(){return{handler:function(){return function(e,t){t&&t(e)}}}};var r=n(2),o=n(1)}).call(this,n(0))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.dropHandlers=t.constants=void 0;var r=function(e){return e&&e.__esModule?e:{default:e}}(n(5)),o=a(n(1)),i=a(n(3));function a(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}t.default=r.default,t.constants=o,t.dropHandlers=i},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var r=u(n(6)),o=u(n(10)),i=n(2),a=n(3),l=n(1);function u(e){return e&&e.__esModule?e:{default:e}}var s={groupName:null,behaviour:"move",orientation:"vertical",getChildPayload:null,animationDuration:250,autoScrollEnabled:!0,shouldAcceptDrop:null,shouldAnimateDrop:null};function c(e,t,n){t?((0,i.addClass)(e,l.animationClass),e.style.transitionDuration=n+"ms"):((0,i.removeClass)(e,l.animationClass),e.style.removeProperty("transition-duration"))}function d(e){return e?e[l.containerInstance]:null}function f(t){if(N.wrapChild)return N.wrapChild(t);var n=e.document.createElement("div");return n.className=""+l.wrapperClass,t.parentElement.insertBefore(n,t),n.appendChild(t),n}function g(e){var t=[];return Array.prototype.map.call(e.children,function(n){if(n.nodeType===Node.ELEMENT_NODE){var r=n;(0,i.hasClass)(n,l.wrapperClass)||(r=f(n)),r[l.containersInDraggable]=[],r[l.translationValue]=0,t.push(r)}else e.removeChild(n)}),t}function p(e){var t=e.layout;return function(e,n){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return function e(n,r,o,i){var a=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(i<o)return o;if(o===i){var l=t.getBeginEnd(n[o]),u=l.begin,s=l.end;return r>u&&r<=s?a?r<(s+u)/2?o:o+1:o:null}var c=Math.floor((i+o)/2),d=t.getBeginEnd(n[c]),f=d.begin,g=d.end;return r<f?e(n,r,o,c-1,a):r>g?e(n,r,c+1,i,a):a?r<(g+f)/2?c:c+1:c}(e,n,0,e.length-1,r)}}function m(e){var t=e.element,n=e.draggables,r=e.layout,o=e.options,i=function(e){var t=e.element,n=e.draggables,r=e.layout;return function(){n.forEach(function(e){c(e,!1),r.setTranslation(e,0),r.setVisibility(e,!0),e[l.containersInDraggable]=[]}),t[l.stretcherElementInstance]&&(t[l.stretcherElementInstance].parentNode.removeChild(t[l.stretcherElementInstance]),t[l.stretcherElementInstance]=null)}}({element:t,draggables:n,layout:r,options:o}),u=(N.dropHandler||a.domDropHandler)({element:t,draggables:n,layout:r,options:o});return function(e,t){var n=t.addedIndex,r=t.removedIndex;if(i(),e.targetElement){var a={removedIndex:r,addedIndex:null!==n?null!==r&&r<n?n-1:n:null,payload:e.payload,droppedElement:e.element.firstElementChild};u(a,o.onDrop)}}}function v(e,t){var n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s;return Object.assign({},s,e)}(t),r=g(e,n.orientation,n.animationDuration);return(0,i.addClass)(e,l.containerClass+" "+n.orientation),{element:e,draggables:r,options:n,layout:(0,o.default)(e,n.orientation,n.animationDuration)}}function h(e,t){var n=function(e,t){for(var n=e.element;n;){var r=d(n.parentElement);if(r&&t.indexOf(r)>-1)return{container:r,draggable:n};n=n.parentElement}return null}(e,t);n&&(n.container.getChildContainers().push(e),e.setParentContainer(n.container),n.draggable[l.containersInDraggable].push(e))}function y(e){var t=e.element,n=e.options,r=null;return function(e){var o=e.draggableInfo,i=r;return null==r&&o.container.element===t&&"copy"!==n.behaviour&&(i=r=o.elementIndex),{removedIndex:i}}}function b(e){var t=e.draggables,n=e.layout;return function(e){var r=e.dragResult;null!==r.removedIndex&&n.setVisibility(t[r.removedIndex],!1)}}function C(e){var t=e.element,n=e.layout;return function(e){var r=e.draggableInfo;return{pos:d(t).isPosInChildContainer()?null:n.getPosition(r.position)}}}function x(e){var t=e.element,n=!1;return function(e){var r=e.dragResult;d(t).getParentContainer()&&n!==(null!==r.pos)&&(n=null!==r.pos,d(t).getParentContainer().onChildPositionCaptured(n))}}function E(e){var t=e.layout,n=null;return function(e){var r=e.draggableInfo;return null===e.dragResult.pos?n=null:{elementSize:n=n||t.getSize(r.element)}}}function S(e){var t=e.element;return function(e){var n=e.draggableInfo,r=e.dragResult;!function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];t&&n?e.targetElement=t:e.targetElement===t&&(e.targetElement=null)}(n,t,!!r.pos)}}function O(){return function(e){return null!==e.dragResult.pos?{addedIndex:0}:{addedIndex:null}}}function w(e){var t=e.layout,n=null;return function(e){var r=e.dragResult.addedIndex;if(r!==n){n=r;var o=t.getBeginEndOfContainer(),i=o.begin,a=o.end;return{shadowBeginEnd:{rect:t.getTopLeftOfElementBegin(i,a)}}}}}function D(e){var t=B(e);return function(e){var n=e.draggableInfo,r=e.dragResult;return n.invalidateShadow?t({draggableInfo:n,dragResult:r}):null}}function I(e){var t=function(e){var t=e.draggables,n=p({layout:e.layout});return function(e){var r=e.dragResult,o=r.shadowBeginEnd,i=r.pos;if(!o){var a=n(t,i,!0);return null!==a?a:t.length}return o.begin+o.beginAdjustment<=i&&o.end>=i?null:i<o.begin+o.beginAdjustment?n(t,i):i>o.end?n(t,i)+1:t.length}}(e);return function(e){var n=e.dragResult,r=null;return null!==n.pos&&null===(r=t({dragResult:n}))&&(r=n.addedIndex),{addedIndex:r}}}function P(){var e=null;return function(t){var n=t.dragResult,r=n.addedIndex,o=n.shadowBeginEnd;r!==e&&null!==e&&o&&(o.beginAdjustment=0),e=r}}function R(t){var n=t.element,r=t.draggables,o=t.layout,i=t.options,a=null;return function(t){var u=t.dragResult,s=u.addedIndex,c=u.removedIndex,d=u.elementSize;if(null===c)if(null!==s){if(!a){var f=o.getBeginEndOfContainer();f.end=f.begin+o.getSize(n);var g=o.getScrollSize(n)>o.getSize(n)?f.begin+o.getScrollSize(n)-o.getScrollValue(n):f.end,p=r.length>0?o.getBeginEnd(r[r.length-1]).end-r[r.length-1][l.translationValue]:f.begin;if(p+d>g){(a=e.document.createElement("div")).className=l.stretcherElementClass+" "+i.orientation;var m=d+p-g;return o.setSize(a.style,m+"px"),n.appendChild(a),n[l.stretcherElementInstance]=a,{containerBoxChanged:!0}}}}else if(a){o.setTranslation(a,0);var v=a;return a=null,n.removeChild(v),n[l.stretcherElementInstance]=null,{containerBoxChanged:!0}}}}function T(e){var t=e.draggables,n=e.layout,r=null,o=null;return function(e){var i=e.dragResult,a=i.addedIndex,l=i.removedIndex,u=i.elementSize;if(a!==r||l!==o){for(var s=0;s<t.length;s++)if(s!==l){var c=t[s],d=0;null!==l&&l<s&&(d-=n.getSize(t[l])),null!==a&&a<=s&&(d+=u),n.setTranslation(c,d)}return r=a,o=l,{addedIndex:a,removedIndex:l}}}}function B(e){var t=e.draggables,n=e.layout,r=null;return function(e){var o=e.draggableInfo,i=e.dragResult,a=i.addedIndex,l=i.removedIndex,u=i.elementSize,s=i.pos,c=i.shadowBeginEnd;if(null!==s){if(null===a||!o.invalidateShadow&&a===r)return null;r&&(r=a);var d=a-1,f=0,g=null,p=null;if(d===l&&d--,d>-1){var m=n.getSize(t[d]);if(p=n.getBeginEnd(t[d]),u<m){var v=(m-u)/2;f=p.end-v}else f=p.end}else p={end:n.getBeginEndOfContainer().begin};var h=1e4,y=a;if(y===l&&y++,y<t.length){var b=n.getSize(t[y]);if(g=n.getBeginEnd(t[y]),u<b){var C=(b-u)/2;h=g.begin+C}else h=g.begin}else g={begin:n.getContainerRectangles().end};return{shadowBeginEnd:{begin:f,end:h,rect:p&&g?n.getTopLeftOfElementBegin(p.end,g.begin):null,beginAdjustment:c?c.beginAdjustment:0}}}return r=null,{shadowBeginEnd:null}}}function A(){var e=null;return function(t){var n=t.dragResult,r=n.pos,o=n.addedIndex,i=n.shadowBeginEnd;if(null!==r){if(null!=o&&null===e){if(r<i.begin){var a=r-i.begin-5;i.beginAdjustment=a}e=o}}else e=null}}function _(e){var t=e.options,n=!1;return function(e){var r=!!e.dragResult.pos;if(r!==n){if(n=r,!r)return t.onDragLeave&&t.onDragLeave(),{dragLeft:!0};t.onDragEnter&&t.onDragEnter()}}}function z(e){var t=e.options,n=null;return function(e){var r=e.dragResult,o=r.addedIndex,i=r.removedIndex,a=e.draggableInfo,l=a.payload,u=a.element;if(t.onDropReady&&n!==o){n=o;var s=o;null!==i&&o>i&&s--,t.onDropReady({addedIndex:s,removedIndex:i,payload:l,element:u.firstElementChild})}}}function j(e){return"drop-zone"===e.options.behaviour?M(e)(y,b,C,x,E,S,O,w,_,z):M(e)(y,b,C,x,E,S,D,I,P,R,T,B,A,_,z)}function M(e){return function(){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];var o=n.map(function(t){return t(e)}),i=null;return function(e){return i=o.reduce(function(t,n){return Object.assign(t,n({draggableInfo:e,dragResult:t}))},i||{addedIndex:null,removedIndex:null,elementSize:null,pos:null,shadowBeginEnd:null})}}}function L(e){return function(t){var n=null,r=null,o=v(e,t),a=j(o),u=m(o),s=null,d=!1,p=[];function y(){null!==r&&(r.invalidateShadow=!0,n=a(r),r.invalidateShadow=!1)}function b(e){d=e,s&&(s.onChildPositionCaptured(e),r&&(n=a(r)))}function C(e,t,n){for(var r=g(t,n.orientation,n.animationDuration),o=0;o<r.length;o++)e[o]=r[o];for(var i=0;i<e.length-r.length;i++)e.pop()}return o.layout.setScrollListener(function(){y()}),{element:e,draggables:o.draggables,isDragRelevant:function(e){var t=e.element,n=e.options;return function(e,r){if(n.shouldAcceptDrop)return n.shouldAcceptDrop(e.getOptions(),r);var o=e.getOptions();return(0,i.getParent)(t,"."+l.wrapperClass)!==e.element&&(e.element===t||!(!o.groupName||o.groupName!==n.groupName))}}(o),getScale:o.layout.getContainerScale,layout:o.layout,getChildContainers:function(){return p},onChildPositionCaptured:b,dispose:function(e){!function(e){Array.prototype.map.call(e.children,function(t){if(t.nodeType===Node.ELEMENT_NODE){var n=t;(0,i.hasClass)(t,l.wrapperClass)&&(e.insertBefore(n,f.firstElementChild),e.removeChild(n))}})}(e.element)},prepareDrag:function(e,t){var n=e.element,r=o.draggables,i=e.getOptions();C(r,n,i),e.layout.invalidateRects(),h(e,t),r.forEach(function(e){return c(e,!0,i.animationDuration)})},isPosInChildContainer:function(){return d},handleDrag:function(e){return r=e,(n=a(e)).dragLeft&&"drop-zone"!==o.options.behaviour&&(n.dragLeft=!1,setTimeout(function(){n&&T(o)({dragResult:n})},20)),n},handleDrop:function(e){r=null,b(!1),a=j(o),u(e,n),n=null,s=null,p=[]},getDragResult:function(){return n},getTranslateCalculator:function(){return T(o).apply(void 0,arguments)},setParentContainer:function(e){s=e},getParentContainer:function(){return s},onTranslated:function(){y()},getOptions:function(){return o.options},setDraggables:function(){C(o.draggables,e,o.options)}}}}function N(e,t){var n=L(e)(t);return e[l.containerInstance]=n,r.default.register(n),{dispose:function(){r.default.unregister(n),n.layout.dispose(),n.dispose(n)}}}t.default=N}).call(this,n(0))},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),n(7);var r=l(n(2)),o=l(n(1)),i=n(8),a=function(e){return e&&e.__esModule?e:{default:e}}(n(9));function l(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}var u=["mousedown","touchstart"],s=["mousemove","touchmove"],c=["mouseup","touchend"],d=null,f=null,g=null,p=null,m=[],v=!1,h=null,y=null,b=null,C=null,x=r.isMobile();function E(){"undefined"!=typeof window&&u.forEach(function(t){e.document.addEventListener(t,w,{passive:!1})})}function S(){return e.document.body}var O=function(){var t=void 0,n=void 0,r=void 0,o=null,i=1,a=5;function l(e){var r=I(e),o=r.clientX,l=r.clientY;if(n)(Math.abs(t.clientX-o)>a||Math.abs(t.clientY-l)>a)&&f();else if(Math.abs(t.clientX-o)>i||Math.abs(t.clientY-l)>i)return g()}function u(){f()}function d(){f()}function f(){clearTimeout(o),s.forEach(function(t){return e.document.removeEventListener(t,l)},{passive:!1}),c.forEach(function(t){return e.document.removeEventListener(t,u)},{passive:!1}),e.document.removeEventListener("drag",d,{passive:!1})}function g(){clearTimeout(o),f(),r()}return function(i,a,f){t=I(i),r=f,(n="number"==typeof a?a:x?100:0)&&(o=setTimeout(g,n)),s.forEach(function(t){return e.document.addEventListener(t,l)},{passive:!1}),c.forEach(function(t){return e.document.addEventListener(t,u)},{passive:!1}),e.document.addEventListener("drag",d,{passive:!1})}}();function w(t){var n=I(t);if(!v&&(void 0===n.button||0===n.button)&&(f=r.getParent(n.target,"."+o.wrapperClass))){var i=r.getParent(f,"."+o.containerClass),a=m.filter(function(e){return e.element===i})[0],l=a.getOptions().dragHandleSelector,u=a.getOptions().nonDragAreaSelector,d=!0;l&&!r.getParent(n.target,l)&&(d=!1),u&&r.getParent(n.target,u)&&(d=!1),d&&O(n,a.getOptions().dragBeginDelay,function(){r.clearSelection(),R(n,r.getElementCursor(t.target)),s.forEach(function(t){e.document.addEventListener(t,T,{passive:!1})}),c.forEach(function(t){e.document.addEventListener(t,D,{passive:!1})})})}}function D(){s.forEach(function(t){e.document.removeEventListener(t,T,{passive:!1})}),c.forEach(function(t){e.document.removeEventListener(t,D,{passive:!1})}),y({reset:!0}),C&&((0,i.removeStyle)(C),C=null),p&&function(e){function t(){r.removeClass(g.ghost,"animated"),g.ghost.style.transitionDuration=null,S().removeChild(g.ghost),e()}function n(e,n,o){var i=e.top,a=e.left;r.addClass(g.ghost,"animated"),o&&r.addClass(g.ghost.firstElementChild,o),g.ghost.style.transitionDuration=n+"ms",g.ghost.style.left=a+"px",g.ghost.style.top=i+"px",setTimeout(function(){t()},n+20)}if(p.targetElement){var o=m.filter(function(e){return e.element===p.targetElement})[0];!function(e){return!e.shouldAnimateDrop||e.shouldAnimateDrop(p.container.getOptions(),p.payload)}(o.getOptions())?t():n(o.getDragResult().shadowBeginEnd.rect,Math.max(150,o.getOptions().animationDuration/2),o.getOptions().dropClass)}else{var i=m.filter(function(e){return e===p.container})[0];if("move"===i.getOptions().behaviour&&i.getDragResult()){var a=i.getDragResult(),l=a.removedIndex,u=a.elementSize,s=i.layout;i.getTranslateCalculator({dragResult:{removedIndex:l,addedIndex:l,elementSize:u}});var c=l>0?s.getBeginEnd(i.draggables[l-1]).end:s.getBeginEndOfContainer().begin;n(s.getTopLeftOfElementBegin(c),i.getOptions().animationDuration,i.getOptions().dropClass)}else r.addClass(g.ghost,"animated"),g.ghost.style.transitionDuration=i.getOptions().animationDuration+"ms",g.ghost.style.opacity="0",g.ghost.style.transform="scale(0.90)",setTimeout(function(){t()},i.getOptions().animationDuration)}}(function(){r.removeClass(e.document.body,o.disbaleTouchActions),r.removeClass(e.document.body,o.noUserSelectClass),P(!1),(d||[]).forEach(function(e){e.handleDrop(p)}),d=null,f=null,g=null,p=null,v=!1,b=null,h=null})}function I(e){return e.touches?e.touches[0]:e}function P(e){m.forEach(function(t){var n=e?t.getOptions().onDragStart:t.getOptions().onDragEnd;if(n){var r={isSource:t===p.container,payload:p.payload};t.isDragRelevant(p.container,p.payload)?r.willAcceptDrop=!0:r.willAcceptDrop=!1,n(r)}})}function R(t,n){v=!0;var l=m.filter(function(e){return f.parentElement===e.element})[0];l.setDraggables(),b=l.getOptions().lockAxis?l.getOptions().lockAxis.toLowerCase():null,p=function(e){var t=m.filter(function(t){return e.parentElement===t.element})[0],n=t.draggables.indexOf(e);return{container:t,element:e,elementIndex:n,payload:t.getOptions().getChildPayload?t.getOptions().getChildPayload(n):void 0,targetElement:null,position:{x:0,y:0},groupName:t.getOptions().groupName}}(f),g=function(t,n,a,l){var u=n.x,s=n.y,c=t.getBoundingClientRect(),d=c.left,f=c.top,g=c.right,p=c.bottom,m=d+(g-d)/2,v=f+(p-f)/2,h=t.cloneNode(!0);return h.style.zIndex=1e3,h.style.boxSizing="border-box",h.style.position="fixed",h.style.left=d+"px",h.style.top=f+"px",h.style.width=g-d+"px",h.style.height=p-f+"px",h.style.overflow="visible",h.style.transition=null,h.style.removeProperty("transition"),h.style.pointerEvents="none",a.getOptions().dragClass?setTimeout(function(){r.addClass(h.firstElementChild,a.getOptions().dragClass);var t=e.getComputedStyle(h.firstElementChild).cursor;C=(0,i.addCursorStyleToBody)(t)}):C=(0,i.addCursorStyleToBody)(l),r.addClass(h,a.getOptions().orientation),r.addClass(h,o.ghostClass),{ghost:h,centerDelta:{x:m-u,y:v-s},positionDelta:{left:d-u,top:f-s}}}(f,{x:t.clientX,y:t.clientY},p.container,n),p.position={x:t.clientX+g.centerDelta.x,y:t.clientY+g.centerDelta.y},p.mousePosition={x:t.clientX,y:t.clientY},r.addClass(e.document.body,o.disbaleTouchActions),r.addClass(e.document.body,o.noUserSelectClass),d=m.filter(function(e){return e.isDragRelevant(l,p.payload)}),h=function(e){var t=e;return function(e){var n=!1;t.forEach(function(t){var r=t.handleDrag(e);n|=r.containerBoxChanged||!1,r.containerBoxChanged=!1}),y({draggableInfo:e}),n&&(n=!1,setTimeout(function(){m.forEach(function(e){e.layout.invalidateRects(),e.onTranslated()})},10))}}(d),y&&y({reset:!0}),y=function(e,t){return e.getOptions().autoScrollEnabled?(0,a.default)(t):function(){return null}}(l,d),d.forEach(function(e){return e.prepareDrag(e,d)}),P(!0),h(p),S().appendChild(g.ghost)}function T(e){e.preventDefault();var t=I(e);p?(b?"y"===b?(g.ghost.style.top=t.clientY+g.positionDelta.top+"px",p.position.y=t.clientY+g.centerDelta.y,p.mousePosition.y=t.clientY):"x"===b&&(g.ghost.style.left=t.clientX+g.positionDelta.left+"px",p.position.x=t.clientX+g.centerDelta.x,p.mousePosition.x=t.clientX):(g.ghost.style.left=t.clientX+g.positionDelta.left+"px",g.ghost.style.top=t.clientY+g.positionDelta.top+"px",p.position.x=t.clientX+g.centerDelta.x,p.position.y=t.clientY+g.centerDelta.y,p.mousePosition.x=t.clientX,p.mousePosition.y=t.clientY),h(p)):R(t,r.getElementCursor(e.target))}(0,i.addStyleToHead)(),t.default=(E(),{register:function(e){m.push(e)},unregister:function(e){m.splice(m.indexOf(e),1)}})}).call(this,n(0))},function(e,t,n){"use strict";(function(e){!function(e){e&&e.prototype&&!e.prototype.matches&&(e.prototype.matches=e.prototype.matchesSelector||e.prototype.mozMatchesSelector||e.prototype.msMatchesSelector||e.prototype.oMatchesSelector||e.prototype.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),n=t.length-1;n>=0&&t.item(n)!==this;)n--;return n>-1})}(e.Node||e.Element),function(e){e&&e.prototype&&null==e.prototype.firstElementChild&&Object.defineProperty(e.prototype,"firstElementChild",{get:function(){for(var e,t=this.childNodes,n=0;e=t[n++];)if(1===e.nodeType)return e;return null}})}(e.Node||e.Element),Array.prototype.some||(Array.prototype.some=function(e){if(null==this)throw new TypeError("Array.prototype.some called on null or undefined");if("function"!=typeof e)throw new TypeError;for(var t=Object(this),n=t.length>>>0,r=arguments.length>=2?arguments[1]:void 0,o=0;o<n;o++)if(o in t&&e.call(r,t[o],o,t))return!0;return!1})}).call(this,n(0))},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.removeStyle=t.addCursorStyleToBody=t.addStyleToHead=void 0;var r,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(1));function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l={overflow:"hidden",display:"block"},u={height:"100%",display:"inline-block","vertical-align":"top","white-space":"normal"},s=(a(r={},"."+i.containerClass,{position:"relative"}),a(r,"."+i.containerClass+" *",{"box-sizing":"border-box"}),a(r,"."+i.containerClass+".horizontal",{"white-space":"nowrap"}),a(r,"."+i.containerClass+".horizontal > ."+i.stretcherElementClass,{display:"inline-block"}),a(r,"."+i.containerClass+".horizontal > ."+i.wrapperClass,u),a(r,"."+i.containerClass+".vertical > ."+i.wrapperClass,l),a(r,"."+i.wrapperClass,{}),a(r,"."+i.wrapperClass+".horizontal",u),a(r,"."+i.wrapperClass+".vertical",l),a(r,"."+i.wrapperClass+".animated",{transition:"transform ease"}),a(r,"."+i.ghostClass+" *",{"box-sizing":"border-box"}),a(r,"."+i.ghostClass+".animated",{transition:"all ease-in-out"}),a(r,"."+i.disbaleTouchActions+" *",{"touch-actions":"none","-ms-touch-actions":"none"}),a(r,"."+i.noUserSelectClass+" *",{"-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none"}),r);function c(e){return Object.keys(e).reduce(function(t,n){var r=e[n];return"object"===(void 0===r?"undefined":o(r))?""+t+n+"{"+c(r)+"}":""+t+n+":"+r+";"},"")}t.addStyleToHead=function(){if("undefined"!=typeof window){var t=e.document.head||e.document.getElementsByTagName("head")[0],n=e.document.createElement("style"),r=c(s);n.type="text/css",n.styleSheet?n.styleSheet.cssText=r:n.appendChild(e.document.createTextNode(r)),t.appendChild(n)}},t.addCursorStyleToBody=function(t){if(t&&"undefined"!=typeof window){var n=e.document.head||e.document.getElementsByTagName("head")[0],r=e.document.createElement("style"),o=c({"body *":{cursor:t+" !important"}});return r.type="text/css",r.styleSheet?r.styleSheet.cssText=o:r.appendChild(e.document.createTextNode(o)),n.appendChild(r),r}return null},t.removeStyle=function(t){t&&"undefined"!=typeof window&&(e.document.head||e.document.getElementsByTagName("head")[0]).removeChild(t)}}).call(this,n(0))},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var r=n(2);function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"y",n=!1,r=null,o=null,i=null,a=null;return{animate:function(l,u){i=l,a=u,(n=!0)&&function n(){null===r&&(r=requestAnimationFrame(function(l){null===o&&(o=l);var u=l-o;o=l;var s=u/1e3*a;(function(e,t,n){e&&(e!==window?"x"===t?e.scrollLeft+=n:e.scrollTop+=n:"x"===t?e.scrollBy(n,0):e.scrollBy(0,n))})(e,t,s="begin"===i?0-s:s),r=null,n()}))}()},stop:function(){n&&(cancelAnimationFrame(r),n=!1,o=null,r=null)}}};function a(e){var t={element:e,rect:(0,r.getVisibleRect)(e,e.getBoundingClientRect()),descendants:[],invalidate:n,axis:null,dispose:function(){e.removeEventListener("scroll",n)}};function n(){t.rect=(0,r.getVisibleRect)(e,e.getBoundingClientRect()),t.descendants.forEach(function(e){return e.invalidate()})}return e.addEventListener("scroll",n),t}function l(e){return Object.assign(e,i(e.element,e.axis))}t.default=function(t){var n=function(e){var t=[],n=null;return e.forEach(function(e){var o=e;for(n=null;o;){var i=(0,r.getScrollingAxis)(o);if(i&&!t.some(function(e){return e.element===o})){var l=a(o);n&&l.descendants.push(n),n=l,"xy"===i?(t.push(Object.assign({},l,{axis:"x"})),t.push(Object.assign({},l,{axis:"y"},{descendants:[]}))):t.push(Object.assign({},l,{axis:i}))}o=o.parentElement}}),t}(t.map(function(e){return e.element})),u=[].concat(o(n.map(l)),o(function(){function t(){return{left:0,right:e.innerWidth,top:0,bottom:e.innerHeight}}return[Object.assign({rect:t(),axis:"y"},i(e)),Object.assign({rect:t(),axis:"x"},i(e,"x"))]}()));return function(e){var t=e.draggableInfo,r=e.reset;if(u.length){if(r)return u.forEach(function(e){return e.stop()}),n.forEach(function(e){return e.dispose()}),null;u.forEach(function(e){var n=function(e,t){var n=t.rect,r=n.left,o=n.right,i=n.top,a=n.bottom,l=e.x,u=e.y;if(l<r||l>o||u<i||u>a)return null;var s=void 0,c=void 0,d=void 0;return"x"===t.axis?(s=r,c=o,d=l):(s=i,c=a,d=u),c-d<100?{direction:"end",speedFactor:(100-(c-d))/100}:d-s<100?{direction:"begin",speedFactor:(100-(d-s))/100}:void 0}(t.mousePosition,e);n?e.animate(n.direction,1500*n.speedFactor):e.stop()})}}}}).call(this,n(0))},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(t,n,l){t[o.extraSizeForInsertion]=0;var u=l,s=function(e){return{get:function(t,n){var r=e[n];return t[r||n]},set:function(t,n,r){requestAnimationFrame(function(){t[e[n]]=e.setters[n]?e.setters[n](r):r})}}}("horizontal"===n?i:a),c={translation:0},d=null;e.addEventListener("resize",function(){m(t)}),setTimeout(function(){g()},10);var f=r.listenScrollParent(t,function(){m(t),d&&d()});function g(){m(t),function(e){var t=e.getBoundingClientRect();c.scaleX=e.offsetWidth?(t.right-t.left)/e.offsetWidth:1,c.scaleY=e.offsetHeight?(t.bottom-t.top)/e.offsetHeight:1}(t)}var p=void 0;function m(e){c.rect=r.getContainerRect(e),c.visibleRect=r.getVisibleRect(e,c.rect)}function v(e){return s.get(e,"size")*s.get(c,"scale")}function h(e){return s.get(e,"dragPosition")}function y(e,t){var r=c.visibleRect,o=r.left,i=r.top,a=r.right,l=r.bottom;l-i<2&&(l=i+30);var u=c.rect;return"vertical"===n?e>u.left&&e<u.right&&t>i&&t<l:e>o&&e<a&&t>u.top&&t<u.bottom}return{getSize:v,getContainerRectangles:function(){return{rect:c.rect,visibleRect:c.visibleRect}},getBeginEndOfDOMRect:function(e){return{begin:s.get(e,"begin"),end:s.get(e,"end")}},getBeginEndOfContainer:function(){var e=s.get(c.rect,"begin")+c.translation,t=s.get(c.rect,"end")+c.translation;return{begin:e,end:t}},getBeginEndOfContainerVisibleRect:function(){var e=s.get(c.visibleRect,"begin")+c.translation,t=s.get(c.visibleRect,"end")+c.translation;return{begin:e,end:t}},getBeginEnd:function(e){var n=function(e){return(s.get(e,"distanceToParent")+(e[o.translationValue]||0))*s.get(c,"scale")}(e)+(s.get(c.rect,"begin")+c.translation)-s.get(t,"scrollValue");return{begin:n,end:n+v(e)*s.get(c,"scale")}},getAxisValue:h,setTranslation:function(e,t){t?s.set(e.style,"translate",t):e.style.removeProperty("transform");e[o.translationValue]=t,e[o.containersInDraggable]&&setTimeout(function(){e[o.containersInDraggable].forEach(function(e){!function e(t){t.layout.invalidateRects();t.onTranslated();t.getChildContainers()&&t.getChildContainers().forEach(function(t){return e(t)})}(e)})},u+20)},getTranslation:function(e){return e[o.translationValue]},setVisibility:function(e,t){void 0!==e[o.visibilityValue]&&e[o.visibilityValue]===t||(t?e.style.removeProperty("visibility"):e.style.visibility="hidden",e[o.visibilityValue]=t)},isVisible:function(e){return void 0===e[o.visibilityValue]||e[o.visibilityValue]},isInVisibleRect:y,dispose:function(){f&&f.dispose();p&&(p.parentNode.removeChild(p),p=null)},getContainerScale:function(){return{scaleX:c.scaleX,scaleY:c.scaleY}},setScrollListener:function(e){d=e},setSize:function(e,t){s.set(e,"setSize",t)},getTopLeftOfElementBegin:function(e){var t=0,r=0;"horizontal"===n?(r=e,t=c.rect.top):(r=c.rect.left,t=e);return{top:t,left:r}},getScrollSize:function(e){return s.get(e,"scrollSize")},getScrollValue:function(e){return s.get(e,"scrollValue")},setScrollValue:function(e,t){return s.set(e,"scrollValue",t)},invalidate:g,invalidateRects:function(){m(t)},getPosition:function(e){return y(e.x,e.y)?h(e):null}}};var r=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(2)),o=n(1);var i={size:"offsetWidth",distanceToParent:"offsetLeft",translate:"transform",begin:"left",end:"right",dragPosition:"x",scrollSize:"scrollWidth",offsetSize:"offsetWidth",scrollValue:"scrollLeft",scale:"scaleX",setSize:"width",setters:{translate:function(e){return"translate3d("+e+"px, 0, 0)"}}},a={size:"offsetHeight",distanceToParent:"offsetTop",translate:"transform",begin:"top",end:"bottom",dragPosition:"y",scrollSize:"scrollHeight",offsetSize:"offsetHeight",scrollValue:"scrollTop",scale:"scaleY",setSize:"height",setters:{translate:function(e){return"translate3d(0,"+e+"px, 0)"}}}}).call(this,n(0))}])});