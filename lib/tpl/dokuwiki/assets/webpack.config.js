const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    console.log('Mode: ', argv.mode);
    devMode = argv.mode === 'development';
    return {
        mode: 'production',
        entry: {
            editor: {
                import: path.join(__dirname, 'src', 'editor.tsx'),
            },
            style: path.join(__dirname, 'src', 'style.js'),
            main: path.join(__dirname, 'src', 'main.ts'),
            tree: path.join(__dirname, 'src', 'tree.tsx'),
            dashboard: path.join(__dirname, 'src', 'dashboard.ts'),
        },
        target: 'web',
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: '/node_modules/',
                },
                {
                    test: /\.jsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
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
            chunkFilename: '[name].bundle.js',
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new webpack.ProvidePlugin({
                React: 'react',
            }),
        ],
        optimization: {
            minimize: true,
            splitChunks: {
                cacheGroups: {
                    reactVendor: {
                        test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
                        name: 'vendor-react',
                        chunks: 'all',
                    },
                },
            },
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        mangle: false,
                        keep_classnames: true,
                        keep_fnames: true,
                    },
                }),
            ],
        },
        watch: devMode,
        watchOptions: {
            ignored: /node_modules/,
        },
    };
};
