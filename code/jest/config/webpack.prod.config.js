const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackCommonConfig = require('./webpack.common.config')

module.exports = {
    ...webpackCommonConfig,
    output: {
        filename: 'js/[name][hash].js',
        path: path.resolve(__dirname, '../public')
    },
    mode: 'production',
    module: {
        rules: [
            ...webpackCommonConfig.module.rules,
            {
                test: /\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,  // replace ExtractTextPlugin.extract({..})
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
        new MiniCssExtractPlugin({
            filename: "./css/[name][contenthash].css",
            chunkFilename: "[id].css"
        })
    ]
}