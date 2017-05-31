const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const utils = require('./webpack-utils/utils');
const baseWebpackConfig = require('./webpack.config.base.js');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');


const devCodeEntry = ['react-hot-loader/patch', 'webpack/hot/dev-server', 'webpack-hot-middleware/client'];

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = devCodeEntry.concat(baseWebpackConfig.entry[name])
});

module.exports = merge(baseWebpackConfig, {
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'client/index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
});
