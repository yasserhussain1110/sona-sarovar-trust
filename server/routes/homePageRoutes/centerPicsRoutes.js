const multer = require('multer');
const auth = require('../../middleware/auth');
const HomePage = require('../../models/homepage');
const fs = require('fs');
const crypto = require('crypto');
const upload = multer();
const {ensureImageAndWriteToDisk, removeExistingImageFile} = require('../../services');
const {RESOURCES_DIR} = process.env;

const centerPicRoutes = app => {
  app.put('/home-page/center-pic', auth, upload.single('pic'), (req, res) => {
    if (!req.file) return res.status(400).send();

    let file = req.file;

    ensureImageAndWriteToDisk(file, RESOURCES_DIR + '/home')
      .then(imagePath => {
        let imageUrl = imagePath.replace(RESOURCES_DIR, "");
        return addImageFileUrlToDB(imageUrl);
      })
      .then(() => {
        return HomePage.findOne().then(h => {
          return h.centerPics[h.centerPics.length - 1]
        });
      })
      .then(pic => {
        res.status(200).send(pic);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send();
      });
  });

  app.patch('/home-page/center-pic/:_id', auth, upload.single('pic'), (req, res) => {
    if (!req.file) return res.status(400).send();

    let _id = req.params._id;
    let file = req.file;

    HomePage
      .findOne({
        'centerPics._id': _id
      })
      .then(homePage => {
        if (!homePage) throw new Error('center pic not found');
        return ensureImageAndWriteToDisk(file, RESOURCES_DIR + '/home');
      })
      .then(imagePath => {
        return removeExistingImageFile(HomePage, 'centerPics', _id).then(() => imagePath);
      })
      .then(imagePath => {
        let imageUrl = imagePath.replace(RESOURCES_DIR, "");
        return updateImageFileUrlInDB(imageUrl, _id).then(() => imageUrl);
      })
      .then(imageUrl => {
        res.status(200).send({url: imageUrl});
      })
      .catch(err => {
        console.log(err);
        res.status(400).send();
      });
  });

  app.delete('/home-page/center-pic/:_id', auth, (req, res) => {
    let _id = req.params._id;
    HomePage
      .findOne({
        'centerPics._id': _id
      })
      .then(() => {
        return removeExistingImageFile(HomePage, 'centerPics', _id);
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
        console.log(err);
        res.status(400).send();
      });
  });
};

const updateImageFileUrlInDB = (imageUrl, _id) => {
  return HomePage.update({'centerPics._id': _id}, {
    $set: {
      'centerPics.$.url': imageUrl
    }
  });
};

const addImageFileUrlToDB = imageUrl => {
  return HomePage.update({
    $push: {
      centerPics: {url: imageUrl}
    }
  });
};

module.exports = centerPicRoutes;
