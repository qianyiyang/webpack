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
                MiniCssExtractPlugin.loader,
                'css-loader',
            ],
        }, {
            test: /\.(png|jpe?g|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    outputPath: 'images/',//输出到images文件夹
                    limit: 500 //是把小于500B的文件打成Base64的格式，写入JS
                }
            }]
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }]
        }]
    },
    plugins: [// 对应的插件
        //清除dist
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({//配置
            filename: 'index.html',//输出文件名
            template: './index.html',//以当前目录下的index.html文件为模板生成dist/index.html文件
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({//配置
            filename: 'list.html',//输出文件名
            template: './index.html',//以当前目录下的index.html文件为模板生成dist/index.html文件
            chunks: ['list']
        }),
    ]
};