import * as constants from './constants';

const verticalWrapperClass = {
	'overflow': 'hidden',
	'display': 'block'
}

const horizontalWrapperClass = {
	'height': '100%',
	'display': 'inline-block',
	'vertical-align': 'top',
	'white-space': 'normal'
}

const stretcherElementHorizontalClass = {
	'display': 'inline-block'
}

const css = {
	[`.${constants.containerClass}`]: {
		'position': 'relative',
	},
	[`.${constants.containerClass} *`]: {
		'box-sizing': 'border-box',
	},
	[`.${constants.containerClass}.horizontal`]: {
		'white-space': 'nowrap',
	},
	[`.${constants.containerClass}.horizontal > .${constants.stretcherElementClass}`]: stretcherElementHorizontalClass,
	[`.${constants.containerClass}.horizontal > .${constants.wrapperClass}`]: horizontalWrapperClass,
	[`.${constants.containerClass}.vertical > .${constants.wrapperClass}`]: verticalWrapperClass,
	[`.${constants.wrapperClass}`]: {
		// 'overflow': 'hidden'
	},
	[`.${constants.wrapperClass}.horizontal`]: horizontalWrapperClass, 
	[`.${constants.wrapperClass}.vertical`]: verticalWrapperClass, 
	[`.${constants.wrapperClass}.animated`]: {
		'transition': 'transform ease'
	},
	[`.${constants.ghostClass} *`]: {
		//'perspective': '800px',
		'box-sizing': 'border-box',
	},
	[`.${constants.ghostClass}.animated`]: {
		'transition': 'all ease-in-out'
	},
	[`.${constants.disbaleTouchActions} *`]: {
		'touch-actions': 'none',
		'-ms-touch-actions': 'none'
	},
	[`.${constants.noUserSelectClass} *`]: {
		'-webkit-touch-callout': 'none',
		'-webkit-user-select': 'none',
		'-khtml-user-select': 'none',
		'-moz-user-select': 'none',
		'-ms-user-select': 'none',
		'user-select': 'none'
	}
};

function convertToCssString(css) {
	return Object.keys(css).reduce((styleString, propName) => {
		const propValue = css[propName];
		if (typeof (propValue) === 'object') {
			return `${styleString}${propName}{${convertToCssString(propValue)}}`;
		}
		return `${styleString}${propName}:${propValue};`;
	}, '');
}

function addStyleToHead() {
	if (typeof (window) !== 'undefined') {
		const head = global.document.head || global.document.getElementsByTagName("head")[0];
		const style = global.document.createElement("style");
		const cssString = convertToCssString(css);
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
	if (cursor && typeof (window) !== 'undefined') {
		const head = global.document.head || global.document.getElementsByTagName("head")[0];
		const style = global.document.createElement("style");
		const cssString = convertToCssString({
			'body *': {
				cursor: `${cursor} !important`
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
	if (styleElement && typeof (window) !== 'undefined') {
		const head = global.document.head || global.document.getElementsByTagName("head")[0];
		head.removeChild(styleElement);
	}
}

export {
	addStyleToHead,
	addCursorStyleToBody,
	removeStyle
};