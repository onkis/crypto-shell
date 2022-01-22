const webpack = require('webpack');
module.exports = {
  entry: './app.js',
  target: 'webworker',
  mode: "production",
  devtool: false
}