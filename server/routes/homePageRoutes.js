const multer = require('multer');
const auth = require('../middleware/auth');
const HomePage = require('../models/homepage');
const fs = require('fs');
const crypto = require('crypto');
const mmm = require('mmmagic');

const upload = multer();

const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);

const homePageRoutes = app => {
  app.put('/home-page/center-pic', auth, upload.single('pic'), (req, res) => {
    if (!req.file) return res.status(400).send();

    let file = req.file;
    let modifiedName = modifyFileName(file.originalname);

    checkIfFileIsImage(file)
      .then(() => {
        writeBufferToDisk('resources/home/' + modifiedName, file.buffer);
      })
      .then(() => {
        addImageFileUrlToDB('/home/' + modifiedName);
      })
      .then(() => {
        res.status(200).send('/home/' + modifiedName);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send();
      });
  });
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

const writeBufferToDisk = (filePath, fileBuf) => new Promise((resolve, reject) => {
  fs.writeFile(filePath, fileBuf, function (err) {
    if (err) throw err;
    resolve(filePath);
  });
});


const modifyFileName = fileName => crypto.pseudoRandomBytes(16).toString('hex') + '-' + fileName;

const addImageFileUrlToDB = imageUrl => {
  return HomePage.findOne().then(homePage => {
    return homePage.update({
      $push: {
        centerPics: {url: imageUrl}
      }
    });
  })
};

module.exports = homePageRoutes;
