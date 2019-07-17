const path = require('path');
const webpack = require("webpack");
const merge = require('webpack-merge');
const common = require('./config.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "development",
    devtool: 'inline-source-map',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "./css/[name].[hash].css",
            chunkFilename: "./css/[id].[hash].css"
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.apiUrl': JSON.stringify('123')
        })
    ],
    devServer: {//配置此静态文件服务器，可以用来预览打包后项目
        inline: true,//打包后加入一个websocket客户端
        hot: true,//热加载 还需要在plugins中配置new webpack.HotModuleReplacementPlugin()
        contentBase: path.resolve(__dirname, 'dist'),//开发服务运行时的文件根目录
        host: 'localhost',//主机地址
        port: 8080,//端口号
        compress: true,//开发服务器是否启动gzip等压缩
        open: true//自动打开浏览器
    },
});