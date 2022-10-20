const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {

	console.log("Mode: ", argv.mode)
	devMode = argv.mode === 'development'
	return {
		mode: argv.mode,
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
		plugins: [new MiniCssExtractPlugin()],
		watch: devMode,
		watchOptions: {
			ignored: /node_modules/,
		}
	}
}