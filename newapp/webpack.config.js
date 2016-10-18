var webpack = require('webpack');

module.exports = {
    entry: "./src/main.js",
    output: {
        path: __dirname + '/public/build/',
        publicPath: "build/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: [/node_modules/, /bower_components/, /public/],
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.jsx$/,
                loader: "babel",
                exclude: [/node_modules/, /bower_components/, /public/],
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: "style!css!autoprefixer",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.less$/,
                loader: "style!css!autoprefixer!less",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.ogg$/,
                loader: "file?name=sound/[name].[ext]"
            }
        ]
    }
};