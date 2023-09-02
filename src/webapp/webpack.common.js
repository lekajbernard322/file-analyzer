const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = () => {
    return ({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            happyPackMode: true,
                        },
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.(jsx|js)?$/,
                    use: {
                        loader: 'babel-loader'
                    },
                    include: /src/
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            modules: ['node_modules']
        },
        plugins: [
            new ESLintPlugin({
                extensions: ['js', 'ts', 'jsx', 'tsx'],
            }),
            new ForkTsCheckerWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './app/index.html',
                chunkSortMode: 'auto',
                inject: 'body',
                base: '/'
            })
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        }
    });
};
