const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {

	console.log("Mode: ", argv.mode)
	devMode = argv.mode === 'development'
	return {
		mode: 'production',
		entry: {
			editor: path.join(__dirname, 'src', 'editor.tsx'),
			tree:   path.join(__dirname, 'src', 'tree.tsx'),
			style:  path.join(__dirname, 'src', 'style.js'),
			//main:  path.join(__dirname, 'src', 'main.ts'),
		},
		target: 'web',
		resolve: {
			extensions: ['.ts', '.tsx', '.js']
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: '/node_modules/'
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"sass-loader",
					],
				},
				{
					test: /\.(png|jp(e*)g|svg|gif)$/,
					use: [
					{
						loader: 'file-loader',
						options: {
						name: 'images/[hash]-[name].[ext]',
						},
					},
					],
				},
			],
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist')
		},
		plugins: [new MiniCssExtractPlugin(), 
		
			new webpack.DefinePlugin({
				PRODUCTION: JSON.stringify(true),
				VERSION: JSON.stringify('5fa3b9'), 
				'process.env.NODE_ENV': JSON.stringify('production'),
				BROWSER_SUPPORTS_HTML5: true,
				TWO: '1+1',
				'typeof window': JSON.stringify('object')
			  })
		],
		watch: devMode,
		watchOptions: {
			ignored: /node_modules/,
		}
	}
}