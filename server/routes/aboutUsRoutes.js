const auth = require('../middleware/auth');
const AboutUs = require('../models/aboutus');
const logger = require('../config/logger');

const aboutUsRoutes = app => {
  app.patch('/api/team-us/vision-mission', auth, (req, res) => {
    const visionAndMission = req.body.visionAndMission;

    if (!visionAndMission) return res.status(400).send();

    AboutUs.findOne().then(aboutUs => {
      aboutUs.visionAndMission = visionAndMission;
      return aboutUs.save();
    }).then(() => {
      res.status(200).send();
    }).catch(e => {
      logger.debug(e.message, e);
      res.status(400).send();
    });
  });

  app.patch('/api/team-us/history', auth, (req, res) => {
    const history = req.body.history;

    if (!history) return res.status(400).send();

    AboutUs.findOne().then(aboutUs => {
      aboutUs.history = history;
      return aboutUs.save();
    }).then(() => {
      res.status(200).send();
    }).catch(e => {
      logger.debug(e.message, e);
      res.status(400).send();
    });
  });
};

module.exports = aboutUsRoutes;
