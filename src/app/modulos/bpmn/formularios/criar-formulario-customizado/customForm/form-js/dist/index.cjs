'use strict';

var formJsViewer = require('../../form-js-viewer');
var formJsEditor = require('../../form-js-editor');
var formJsPlayground = require('../../form-js-playground');



Object.defineProperty(exports, "FormPlayground", {
	enumerable: true,
	get: function () { return formJsPlayground.Playground; }
});
Object.keys(formJsViewer).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return formJsViewer[k]; }
	});
});
Object.keys(formJsEditor).forEach(function (k) {
	if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return formJsEditor[k]; }
	});
});
//# sourceMappingURL=index.cjs.map
