/* eslint-disable global-require */

module.exports = app => {
  require('./centerPicsRoutes')(app);
  require('./captionRoutes')(app);
  require('./brandLogoRoutes')(app);
};
