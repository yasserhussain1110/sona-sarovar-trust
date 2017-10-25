const auth = require('../middleware/auth');
const AboutUs = require('../models/aboutus');
const logger = require('../config/logger');

const aboutUsRoutes = app => {
  app.patch('/api/about-us/vision', auth, (req, res) => {
    const vision = req.body.vision;

    if (!vision) return res.status(400).send();

    AboutUs.findOne().then(aboutUs => {
      aboutUs.vision = vision;
      return aboutUs.save();
    }).then(() => {
      res.status(200).send();
    }).catch(e => {
      logger.error(e.message, e);
      res.status(400).send();
    });
  });

  app.patch('/api/about-us/mission', auth, (req, res) => {
    const mission = req.body.mission;

    if (!mission) return res.status(400).send();

    AboutUs.findOne().then(aboutUs => {
      aboutUs.mission = mission;
      return aboutUs.save();
    }).then(() => {
      res.status(200).send();
    }).catch(e => {
      logger.error(e.message, e);
      res.status(400).send();
    });
  });

  app.patch('/api/about-us/history', auth, (req, res) => {
    const history = req.body.history;

    if (!history) return res.status(400).send();

    AboutUs.findOne().then(aboutUs => {
      aboutUs.history = history;
      return aboutUs.save();
    }).then(() => {
      res.status(200).send();
    }).catch(e => {
      logger.error(e.message, e);
      res.status(400).send();
    });
  });
};

module.exports = aboutUsRoutes;
