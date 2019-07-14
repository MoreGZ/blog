const path = require('path')
const fs = require('fs')
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpackCommonConfig = require('./webpack.common.config')

module.exports = Object.assign({}, webpackCommonConfig, {
    output: {
        filename: 'js/[name][hash].js',
        path: path.resolve(__dirname, '../public'),
        publicPath: "http://localhost:7001/"
    },
    mode: 'development',
    devServer: {
        host: 'localhost',
        contentBase: path.join(__dirname, '../public'),
        compress: true,
        hot: true,
        disableHostCheck: true,
        allowedHosts: [
            'localhost:7003',
        ],
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        proxy: {
            "/api": "http://localhost:7003"
        }
    },
    module: {
        rules: [
            ...webpackCommonConfig.module.rules,
            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, 
                    {
                        loader: "less-loader", // compiles Less to CSS
                        options: {
                            modifyVars: {
                                'primary-color': '#bb9d77',
                                'border-color-base': '#bb9d77'
                            },
                            javascriptEnabled: true,
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        ...webpackCommonConfig.plugins,
        new webpack.HotModuleReplacementPlugin()
    ]
})