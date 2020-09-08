// webpack.config.js
//    this is a node JS script

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = env => {
	isProduction = env === 'production';
	const cssExtract = new ExtractTextPlugin('styles.css'); // we will create a styles.css file

	return {
		// essentials
		//   https://webpack.js.org/concepts/#entry
		entry: ['@babel/polyfill', './src/app.js'],
		output: {
			path: path.resolve(__dirname, 'public', 'dist'),
			filename: 'bundle.js' // common filename for webpack-generated output
		},
		module: {
			rules: [{
					loader: 'babel-loader', // look at .babelrc in project root for presets set
					test: /\.js[x]{0,1}$/,
					exclude: /node_modules/
				},
				{
					use: cssExtract.extract({
						use: [
							{
								loader: 'css-loader',
								options: {sourceMap: true}
							},
							{
								loader: 'sass-loader',
								options: {sourceMap: true}
							}
						]
					}),
					test: /\.s?css$/
				}
			]
		},
		/*
		 * The plugins array is for third-party webpack plugins; these plugins should have access to edit
		 * your existing webpack build.
		 */
		plugins: [
			cssExtract,
			new Dotenv({path: `.env.${env}`})
		],
		/*
		 * 'source-map' is more expensive to build but better for production, as it is an external file
		 * and only opens when the dev tools are opened in the browser;
		 * see https://webpack.js.org/configuration/devtool/ for various prod or dev source map options.
		 * We were using 'cheap-module-eval-source-map' for development but it fails to split CSS into
		 * original source files, so we now use 'inline-source-map' which is a bit slower.
		 */
		devtool: isProduction ? 'source-map' : 'inline-source-map',
		devServer: { // see https://webpack.js.org/configuration/dev-server/
			contentBase: path.resolve(__dirname, 'public'),
			publicPath: '/dist/',
			historyApiFallback: true // so that React Router serves index.html for all routes
		} // devServer never generates bundle.js! This is a nice replacement for live-server
	};
};