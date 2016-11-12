'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

// Additional npm modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../dist/build'),
    filename: 'bundle.js',
    publicPath: defaultSettings.publicPath
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      components: `${defaultSettings.srcPath}/components/`,
      sound: `${defaultSettings.srcPath}/sound/`,
      config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV
    }
  },
  module: {}
};