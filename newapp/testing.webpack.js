'use strict';

// Depends
var path = require('path');
var webpack = require('webpack');

module.exports = function(_path) {
    var rootAssetPath = './src';
    return {
        cache: true,
        devtool: 'inline-source-map',
        resolve: {
            extensions: ['', '.js', '.jsx'],
            modulesDirectories: ['node_modules']
        },
        module: {
            preLoaders: [
                {
                    test: /.spec\.js$/,
                    include: /src/,
                    exclude: /(bower_components|node_modules)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015'],
                        cacheDirectory: true,
                    }
                },
                {
                    test: /\.js?$/,
                    include: /src/,
                    exclude: /(node_modules|__tests__)/,
                    loader: 'babel-istanbul',
                    query: {
                        cacheDirectory: true,
                    },
                },
            ],
            loaders: [
                // es6 loader
                {
                    include: path.join(_path, 'src'),
                    loader: 'babel-loader',
                    exclude: /(node_modules|__tests__)/,
                    query: {
                        presets: ['es2015'],
                        cacheDirectory: true,
                    }
                },

                // jade templates
                { test: /\.jade$/, loader: 'jade-loader' },

                // stylus loader
                { test: /\.styl$/, loader: 'style!css!stylus' },

                // external files loader
                {
                    test: /\.(png|ico|jpg|jpeg|gif|svg|ttf|eot|woff|woff2)$/i,
                    loader: 'file',
                    query: {
                        context: rootAssetPath,
                        name: '[path][hash].[name].[ext]'
                    }
                }
            ],
        },
    };
};