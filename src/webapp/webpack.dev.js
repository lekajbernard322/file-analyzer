const webpack = require('webpack');
const {merge} = require('webpack-merge');
const path = require('path');
const sass = require('sass');

const commonConfig = require('./webpack.common');

const ENV = 'development';

module.exports = options => merge(commonConfig({env: ENV, ...options}), {
    devtool: 'cheap-module-source-map',
    mode: ENV,
    output: {
        filename: 'app/[name].bundle.js',
        chunkFilename: 'app/[id].chunk.js',
        path: path.resolve(__dirname, '../..', 'dist')
    },
    entry: ['./app/index'],
    optimization: {
        moduleIds: 'named',
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
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
    devServer: {
        hot: true,
        proxy: [{
            context: [
                '/report'
            ],
            target: `http${options.tls ? 's' : ''}://localhost:8000`,
            secure: false,
            changeOrigin: options.tls
        }],
        https: options.tls,
        historyApiFallback: true,
        open: true
    }
})
;
