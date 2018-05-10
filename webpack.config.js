var path = require('path');

const dirname = __dirname// eslint-disable-line

module.exports = {
	entry: './index.js',
	// devtool: 'source-map',
	output: {
		path: path.resolve(dirname, 'dist'), 
		filename: 'index.js',
		library: 'SmoothDnD',
		libraryTarget: "umd",
		globalObject: 'this',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader'
			}
		]
	}
};