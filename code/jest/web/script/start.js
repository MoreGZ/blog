const path = require('path')
const webpack = require("webpack")
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require("../config/webpack.dev.config")
const { deleteFolderRecursive } = require('./util')
const _ = require('lodash')

//删除原来的打包文件
const publicDir = path.resolve(__dirname, '../public')
deleteFolderRecursive(publicDir)

// 开启webpack devServer
webpackConfig.entry = _.mapValues(webpackConfig.entry, (val, key) => {
    const newVal = [
        `webpack-dev-server/client?http://localhost:7001/`,
        'webpack/hot/only-dev-server',
        val,
    ]
    return newVal
})
// WebpackDevServer.addDevServerEntrypoints(webpackConfig, webpackConfig.devServer);
const compiler = webpack(webpackConfig)
const server = new WebpackDevServer(compiler, webpackConfig.devServer);

server.listen(7001, '127.0.0.1', () => {
    console.log('Starting server on http://localhost:7001');
});

