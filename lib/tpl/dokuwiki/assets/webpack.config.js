const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => {

	console.log("Mode: ", argv.mode)
	devMode = argv.mode === 'development'
	return {
		mode: 'production',
		entry: {
			editor: {
				import: path.join(__dirname, 'src', 'editor.tsx'),
			},
			tree: {
				import: path.join(__dirname, 'src', 'tree.tsx'),
			},
			style:  path.join(__dirname, 'src', 'style.js'),
			main:  path.join(__dirname, 'src', 'main.ts'),
			dashboard: path.join(__dirname, 'src', 'dashboard.js'),
		},
		target: 'web',
		resolve: {
			extensions: ['.ts', '.tsx', '.js']
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					loader: 'ts-loader',
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
			path: path.resolve(__dirname, 'dist'),
			chunkFilename: '[name].bundle.js'
		},
		plugins: [new MiniCssExtractPlugin(), 
			new webpack.ProvidePlugin({
				"React": "react",
			})
		],
		optimization: {
			splitChunks: {
				cacheGroups: {
					reactVendor: {
					  test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
					  name: "vendor-react",
					  chunks: "all",
					},
				  
				},
			},
			minimizer: [
				new UglifyJsPlugin({
				  uglifyOptions: {
					output: {
					  comments: false,
					},
					compress: {
					  drop_console: true,
					},
				  },
				}),
			  ],
		},
		watch: devMode,
		watchOptions: {
			ignored: /node_modules/,
		}
	}
}