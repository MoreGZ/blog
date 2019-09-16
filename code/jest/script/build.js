const fs = require("fs")
const path = require('path')
const webpack = require("webpack")
const config = require("../config/webpack.prod.config")
const { deleteFolderRecursive } = require('./util')

//删除原来的打包文件
const publicDir = path.resolve(__dirname, '../public')
deleteFolderRecursive(publicDir)

// webpack编译
const compiler = webpack(config)

compiler.run((err, stats) => {
    if(err || stats.hasErrors()) {
        console.log(stats.toString())
    }
})