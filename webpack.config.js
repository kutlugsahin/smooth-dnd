var path = require('path');

const dirname = __dirname// eslint-disable-line

module.exports = {
	entry: './index.js',
	output: {
		path: path.resolve(dirname, 'dist'), 
		filename: 'index.js'
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