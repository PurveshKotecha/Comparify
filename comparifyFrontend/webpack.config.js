const path = require('path');

module.exports = { 
	entry: ['babel-polyfill', './index.js'],
	output: {
		path: path.resolve(__dirname, './'),
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: './'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
  				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	node: {
		fs:"empty"
}
};
 