const multer = require('multer');
const auth = require('../../middleware/auth');
const HomePage = require('../../models/homepage');
const fs = require('fs');
const crypto = require('crypto');
const mmm = require('mmmagic');
const upload = multer();
const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);
const {RESOURCES_DIR} = process.env;

const centerPicRoutes = app => {
  app.put('/home-page/center-pic', auth, upload.single('pic'), (req, res) => {
    if (!req.file) return res.status(400).send();

    let file = req.file;
    let modifiedName = modifyFileName(file.originalname);

    checkIfFileIsImage(file)
      .then(() => {
        return writeBufferToDisk(RESOURCES_DIR + '/home/' + modifiedName, file.buffer);
      })
      .then(() => {
        return addImageFileUrlToDB('/home/' + modifiedName);
      })
      .then(() => {
        res.status(200).send('/home/' + modifiedName);
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
    let modifiedName = modifyFileName(file.originalname);


    HomePage
      .findOne({
        'centerPics._id': _id
      })
      .then(homePage => {
        if (!homePage) throw new Error('center pic not found');
        return checkIfFileIsImage(file);
      })
      .then(() => {
        return writeBufferToDisk(RESOURCES_DIR + '/home/' + modifiedName, file.buffer);
      })
      .then(() => {
        return removeExistingImageFile(_id);
      })
      .then(() => {
        return updateImageFileUrlInDB('/home/' + modifiedName, _id);
      })
      .then(() => {
        res.status(200).send('/home/' + modifiedName);
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
        return removeExistingImageFile(_id);
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

const removeExistingImageFile = _id => {
  return HomePage.findOne({
    'centerPics._id': _id
  }, {
    _id: 0,
    'centerPics.$': 1
  }).then(homePage => {
    if (!homePage) throw new Error('center pic not found');
    let picUrl = homePage.centerPics[0].url;
    return new Promise(resolve => {
      let filePath = RESOURCES_DIR + picUrl;
      fs.unlink(filePath, function (err) {
        if (err) throw err;
        resolve(filePath);
      });
    });
  })
};

const checkIfFileIsImage = file => new Promise((resolve, reject) => {
  magic.detect(file.buffer, function (err, result) {
    if (err) throw err;
    let validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (validImageTypes.indexOf(result) > -1) {
      resolve(result);
    } else {
      reject();
    }
  });
});

const writeBufferToDisk = (filePath, fileBuf) => new Promise(resolve => {
  fs.writeFile(filePath, fileBuf, function (err) {
    if (err) throw err;
    resolve(filePath);
  });
});


const modifyFileName = fileName => crypto.pseudoRandomBytes(8).toString('hex') + '-' + fileName;

const addImageFileUrlToDB = imageUrl => {
  return HomePage.update({
    $push: {
      centerPics: {url: imageUrl}
    }
  });
};

module.exports = centerPicRoutes;
