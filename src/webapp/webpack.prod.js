const webpack = require('webpack');
const {merge} = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const sass = require('sass');

const commonConfig = require('./webpack.common');

const ENV = 'production';

module.exports = options => {
    return merge(commonConfig({env: ENV, ...options}), {
        mode: ENV,
        entry: ['./app/index'],
        output: {
            filename: 'app/[name].[contenthash].bundle.js',
            chunkFilename: 'app/[name].[chunkhash].chunk.js',
            path: path.resolve(__dirname, '../..', 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        'css-loader',
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options: {implementation: sass},
                        },
                    ],
                },
            ],
        },
        optimization: {
            runtimeChunk: false,
            minimizer: [
                new TerserPlugin()
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'content/[name].[contenthash].css',
                chunkFilename: 'content/[name].[chunkhash].css',
            })
        ],
    });
};
