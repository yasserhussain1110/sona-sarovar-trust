module.exports = app => {
  require('./centerPicsRoutes')(app);
  require('./captionRoutes')(app);
  require('./mainTextRoutes')(app);
  require('./brandLogoRoutes')(app);
};
