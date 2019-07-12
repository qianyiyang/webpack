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
        path: path.resolve(__dirname, 'dist')
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
                commons: {
                    name: 'commons',    //提取出来的文件命名
                    chunks: 'initial',  //initial表示提取入口文件的公共部分
                    minChunks: 2,       //表示提取公共部分最少的文件数
                    minSize: 0          //表示提取公共部分最小的大小
                }
                // lib1: {
                //     test: /[\\/]node_modules[\\/]/,//精确的选择那些公共模块应该被打包
                //     chunks: "all",
                //     name: "commons",
                //     enforce: true,//忽略minSize、maxSize、maxAsyncRequests、maxInitalRequests等限制条件直接打包。
                // },
                // commonCss: {
                //     test: /\.css$/,//精确的选择那些公共模块应该被打包
                //     chunks: "all",
                //     name: "css",
                //     enforce: false,//忽略minSize、maxSize、maxAsyncRequests、maxInitalRequests等限制条件直接打包。
                //     minChunks: 2,       //表示提取公共部分最少的文件数
                //     minSize: 0          //表示提取公共部分最小的大小
                // }
            }
        }
    }
});