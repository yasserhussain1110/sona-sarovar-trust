/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const webpackDevConfig = require('../../webpack.config.dev.js');
const compiler = webpack(webpackDevConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  quiet: false
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
});

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({action: 'reload'});
    cb();
  });
});

const connectHistoryAPIFallBack = require('connect-history-api-fallback')();

module.exports = app => {
  // handle fallback for HTML5 history API
  app.use(connectHistoryAPIFallBack);

  // serve webpack bundle output
  app.use(devMiddleware);

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware);

  const uri = 'http://localhost:' + process.env.PORT;

  devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n');
  });
};
