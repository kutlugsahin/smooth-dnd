if (!Element.prototype.matches) {
	Element.prototype.matches =
		Element.prototype.matchesSelector ||
		Element.prototype.mozMatchesSelector ||
		Element.prototype.msMatchesSelector ||
		Element.prototype.oMatchesSelector ||
		Element.prototype.webkitMatchesSelector ||
		function(s) {
			var matches = (this.document || this.ownerDocument).querySelectorAll(s),
				i = matches.length;
			while (--i >= 0 && matches.item(i) !== this) { }
			return i > -1;
		};
}

// Overwrites native 'firstElementChild' prototype.
// Adds Document & DocumentFragment support for IE9 & Safari.
// Returns array instead of HTMLCollection.
; (function(constructor) {
	if (constructor &&
		constructor.prototype &&
		constructor.prototype.firstElementChild == null) {
		Object.defineProperty(constructor.prototype, 'firstElementChild', {
			get: function() {
				var node, nodes = this.childNodes, i = 0;
				while (node = nodes[i++]) {
					if (node.nodeType === 1) {
						return node;
					}
				}
				return null;
			}
		});
	}
})(window.Node || window.Element);