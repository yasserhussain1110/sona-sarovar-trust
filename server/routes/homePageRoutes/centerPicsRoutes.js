const multer = require('multer');
const auth = require('../../middleware/auth');
const HomePage = require('../../models/homepage');
const fs = require('fs');
const crypto = require('crypto');
const upload = multer();
const {ensurePicAndWriteToDisk, removeExistingPicFile} = require('../../services');
const {RESOURCES_DIR} = process.env;

const centerPicRoutes = app => {
  app.put('/api/home-page/center-pic', auth, upload.single('pic'), (req, res) => {
    if (!req.file) return res.status(400).send();

    let file = req.file;

    HomePage.findOne()
      .then(h => {
        if (!h) throw new Error('Could not find a HomePage.');
        return ensurePicAndWriteToDisk(file, RESOURCES_DIR + '/home').then(picPath => ({picPath, h}));
      })
      .then(({picPath, h}) => {
        let picUrl = picPath.replace(RESOURCES_DIR, '');
        h.centerPics.push({url: picUrl});
        return h.save().then(h => h.centerPics[h.centerPics.length - 1]);
      })
      .then(pic => {
        res.status(200).send(pic);
      })
      .catch(err => {
        console.log(err.stack);
        res.status(400).send();
      });
  });

  app.patch('/api/home-page/center-pic/:_id', auth, upload.single('pic'), (req, res) => {
    if (!req.file) return res.status(400).send();

    let _id = req.params._id;
    let file = req.file;

    HomePage
      .findOne({
        'centerPics._id': _id
      })
      .then(homePage => {
        if (!homePage) throw new Error('center pic not found');
        return ensurePicAndWriteToDisk(file, RESOURCES_DIR + '/home');
      })
      .then(picPath => {
        return removeExistingPicFile(HomePage, 'centerPics', _id).then(() => picPath);
      })
      .then(picPath => {
        let picUrl = picPath.replace(RESOURCES_DIR, '');
        return updatePicFileUrlInDB(picUrl, _id).then(() => picUrl);
      })
      .then(picUrl => {
        res.status(200).send({url: picUrl});
      })
      .catch(err => {
        console.log(err.stack);
        res.status(400).send();
      });
  });

  app.delete('/api/home-page/center-pic/:_id', auth, (req, res) => {
    let _id = req.params._id;
    HomePage
      .findOne({
        'centerPics._id': _id
      })
      .then(h => {
        if (!h) throw new Error('Could not find center pic.');
        if (h.centerPics.length === 1) throw new Error('Only one pic remaining. Cannot delete it.');
        return removeExistingPicFile(HomePage, 'centerPics', _id);
      })
      .then(() => {
        return HomePage.update({
          $pull: {
            centerPics: {_id}
          }
        });
      })
      .then(() => {
        res.status(200).send();
      })
      .catch(err => {
        console.log(err.stack);
        res.status(400).send();
      });
  });
};

const updatePicFileUrlInDB = (picUrl, _id) => {
  return HomePage.update({'centerPics._id': _id}, {
    $set: {
      'centerPics.$.url': picUrl
    }
  }, {
    runValidators: true
  });
};

module.exports = centerPicRoutes;
