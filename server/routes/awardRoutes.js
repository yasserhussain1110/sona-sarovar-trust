const auth = require('../middleware/auth');
const Award = require('../models/award');
const multer = require('multer');
const logger = require('../config/logger');
const fs = require('fs');
const {ensurePicAndWriteToDisk} = require('../services');

const upload = multer();
const {RESOURCES_DIR} = process.env;

const awardRoutes = app => {
  app.put('/api/awards', auth, upload.single('pic'), (req, res) => {
    if (!req.file) return res.status(400).send();

    const file = req.file;
    ensurePicAndWriteToDisk(file, RESOURCES_DIR + '/awards')
      .then(picPath => {
        const picUrl = picPath.replace(RESOURCES_DIR, '');
        return picUrl;
      })
      .then(picUrl => {
        return new Award({
          url: picUrl
        }).save();
      })
      .then(award => {
        res.send(award);
      })
      .catch(e => {
        logger.error(e.message, e);
        res.status(400).send();
      });
  });

  app.delete('/api/awards/:_id', auth, (req, res) => {
    const _id = req.params._id;

    Award.findById(_id).then(award => {
      if (!award) throw new Error('Could not find activity.');
      const url = award.url;
      const picPath = RESOURCES_DIR + url;
      return new Promise((res) => {
        fs.unlink(picPath, () => {
          res(award);
        });
      });
    }).then(award => {
      return award.remove();
    }).then(() => {
      res.status(200).send();
    }).catch(e => {
      logger.error(e.message, e);
      res.status(400).send();
    });
  });
};

module.exports = awardRoutes;
