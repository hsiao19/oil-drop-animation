const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const atImport = require('postcss-import');
const cssnext = require('postcss-preset-env');

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							plugins: [
								[
									'module-resolver',
									{
										root: ['./src'],
									},
								],
							],
						},
					},
				],
			},
			{
				test: /\.(css|sass|scss)$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: 'inline',
							plugins: () => [atImport(), cssnext({})],
						},
					},
				],
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
