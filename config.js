const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        index: './src/index.js',
        list: './src/list.js',
        // jquery: 'jquery',
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'  //指定存放 CSS 中导入的资源（例如图片）的 CDN 目录 URL
                    },
                },
                'css-loader',
            ],
        }, {
            test: /\.(png|jpe?g|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    name: path.join('[name].[ext]?[hash]'),
                    outputPath: './images/',//输出到images文件夹
                    limit: 500 //是把小于500B的文件打成Base64的格式，写入JS
                }
            }]
        }, {
            test: /\.js$/,
            exclude: /node_modules/, // npm包不做处理
            include: /src/, // 只处理src里面的
            use: [{
                loader: 'babel-loader',
            }]
        }]
    },
    plugins: [// 对应的插件
        //清除dist
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({//配置
            filename: 'index.html',//输出文件名
            template: './index.html',//以当前目录下的index.html文件为模板生成dist/index.html文件
            chunks: ['index'],
            // stylePublicPath: '//cdn.bootcss.com/',// 指定存放 CSS 文件的 CDN 目录 URL
        }),
        new HtmlWebpackPlugin({//配置
            filename: 'list.html',//输出文件名
            template: './index.html',//以当前目录下的index.html文件为模板生成dist/index.html文件
            chunks: ['list']
        }),
    ]
};