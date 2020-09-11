const path = require('path');
const WebpackRequireFrom = require('webpack-require-from');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const webpack = require('webpack');

module.exports = {
	entry: {
		app: './src/scripts/app.js',
		init: './src/scripts/init.js',
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './public/dist'),
	},

	mode: 'production',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [{ loader: 'babel-loader' }],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								autoprefixer(),
								cssnano({ preset: 'default' }),
							],
						},
					},
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new WebpackRequireFrom({
			variableName: 'scriptsPath',
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin(),
		new webpack.DefinePlugin({
			'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
		}),
	],
};
