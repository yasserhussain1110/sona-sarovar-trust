module.exports = app => {
  require('./centerPicsRoutes')(app);
  require('./captionRoutes')(app);
  require('./mainTextRoutes')(app);
};