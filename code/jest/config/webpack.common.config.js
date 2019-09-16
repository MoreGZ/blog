const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')

const sourcePath = path.resolve(__dirname, '../src')
const entryKeys = fs.readdirSync(sourcePath)
let entries = {}, 
    aliases = {}, 
    htmlWebpackPlugins = [],
    commonScriptsEntries = ['common']
entryKeys.forEach((value) => {
    entries[value] = path.resolve(sourcePath, value, 'index.tsx')
    aliases[`@${value}`] = `${sourcePath}/${value}/`
    if(!commonScriptsEntries.includes(value)) {
        htmlWebpackPlugins.push(new HtmlWebpackPlugin({
            template: './web/config/templete.html',
            filename: `${value}.html`,
            chunks: [ ...commonScriptsEntries, value],
        }))
    }
})

console.log(entries)

module.exports = {
    entry: entries,
    resolve: {
        extensions: [".js", "jsx", '.ts', '.tsx', ".json"],
        alias: Object.assign({}, aliases)
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                // ts 都用 babel-loader 处理
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: { cacheDirectory: true },
                }],
            },
        ]
    },
    plugins: [
        ...htmlWebpackPlugins
    ]
}