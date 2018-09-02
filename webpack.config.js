const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			filename: './index.html',
		}),
	],
};
