const fs = require('fs');
const mmm = require('mmmagic');
const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);
const crypto = require('crypto');

const ensureImageAndWriteToDisk = (file, dir) => {
  let fileBuf = file.buffer;
  let modifiedName =  modifyFileName(file.originalname);
  let filePath = `${dir}/${modifiedName}`;
  return checkIfFileIsImage(fileBuf).then(() => {
    return writeBufferToDisk(filePath, fileBuf);
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


const modifyFileName = fileName => crypto.pseudoRandomBytes(8).toString('hex') + '-' + fileName;

const checkIfFileIsImage = fileBuf => new Promise((resolve, reject) => {
  magic.detect(fileBuf, function (err, result) {
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

module.exports = {
  ensureImageAndWriteToDisk,
  removeExistingImageFile
};
