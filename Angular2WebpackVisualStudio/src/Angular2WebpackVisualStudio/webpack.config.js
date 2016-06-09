﻿var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        "vendor": "./angular2App/app/vendor",
        "app": "./angular2App/app/boot"
    },
    output: {
        path: __dirname,
        filename: "./wwwroot/dist/[name].bundle.js"
    },
    resolve: {
        extensions: ['', '.ts', '.js', '.html', '.scss', '.css']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.ts/,
                loaders: ['ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: 'raw-loader!sass-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },    
    plugins: [
      new ExtractTextPlugin('./wwwroot/dist/[name].css'),
      new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"./wwwroot/dist/vendor.bundle.js")
    ]
}
