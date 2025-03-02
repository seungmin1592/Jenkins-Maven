const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    configureWebpack: {
        plugins: [
            new NodePolyfillPlugin(),
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: JSON.stringify(true),  // Enables Options API (if you're using it)
                __VUE_PROD_DEVTOOLS__: JSON.stringify(false), // Disables Vue Devtools in production
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false) // Controls hydration mismatch details in production
            })
        ],
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },
        output: {
            filename: '[name].[contenthash].js',
            chunkFilename: '[name].[contenthash].js'
        }
    },
    outputDir: path.resolve(__dirname, "../main/resources/static/dist"),
    indexPath: path.resolve(__dirname, "../main/resources/static/index.html"),
    devServer: {
        proxy: {
            '/v1/': {
                target: `http://localhost:9910`,
                ws: true,
                changeOrigin: true
            },
            '/auth/': {
                target: `http://localhost:9910`,
                ws: true,
                changeOrigin: true,
            }
        },
        headers: {
            'Cache-Control': 'no-store',
            'Pragma': 'no-cache'
        }
    },
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.output.filename('[name].[contenthash].js')
            config.output.chunkFilename('[name].[contenthash].js')
        }
    },
    lintOnSave: false
};
