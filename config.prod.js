const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./config.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '//cdn.bootcss.com/' // 指定存放 JavaScript 文件的 CDN 目录 URL
    },
    plugins: [
        //提取css
        new MiniCssExtractPlugin({
            filename: "./css/[name].[contenthash].css",
            chunkFilename: "./css/[id].[contenthash].css"
        }),
        //压缩css
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,       //一个正则表达式，指示应优化/最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
            cssProcessor: require('cssnano'), //用于优化\最小化CSS的CSS处理器，默认为cssnano
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, //传递给cssProcessor的选项，默认为{}
            canPrint: true                    //一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
        }),
        //定义环境变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.apiUrl': JSON.stringify('abc')
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 注意: priority属性
                // 其次: 打包业务中公共代码
                common: {
                    name: "common",
                    chunks: "all",
                    minSize: 1,
                    priority: 0
                },
                // 首先: 打包node_modules中的文件
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
                }
            }
        }
    }
});