const path = require('path');
const webpack = require('webpack');
const utils = require('./webpack-utils/utils');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(relPath) {
  return path.join(__dirname, relPath);
}

module.exports = {
  /* devServer: {
    host: 'localhost',
    port: '3000',
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }, */
  /*entry: [
    'react-hot-loader/patch',
    path.join(__dirname, './client/index.js')
  ],*/
  entry: {
    app: resolve('./client/index.js')
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
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
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
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
  /*plugins: dev ?
    [
      HTMLWebpackPluginConfig,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ] :
    [HTMLWebpackPluginConfig, DefinePluginConfig, UglifyJsPluginConfig]*/
  plugins: [
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: resolve('./client/static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ]
};
