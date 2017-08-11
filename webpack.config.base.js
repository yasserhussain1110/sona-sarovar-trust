const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./webpack-utils/utils');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(relPath) {
  return path.join(__dirname, relPath);
}

module.exports = {
  entry: {
    app: resolve('./client/index.js')
  },
  output: {
    path: resolve('dist'),
    filename: utils.assetsPath('js/[name].js'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [resolve('client'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'client/index.html',
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: resolve('./client/static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ]
};
