const fs = require('fs');
const mmm = require('mmmagic');
const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);
const crypto = require('crypto');
const {RESOURCES_DIR} = process.env;

const ensurePicAndWriteToDisk = (file, dir) => {
  let fileBuf = file.buffer;
  let modifiedName = modifyFileName(file.originalname);
  let filePath = `${dir}/${modifiedName}`;
  return checkIfFileIsPic(fileBuf).then(() => {
    return writeBufferToDisk(filePath, fileBuf);
  });
};

const removeExistingPicFile = (model, arrayField, _id) => {
  let subFieldId = `${arrayField}._id`;
  let subFieldQuery = `${arrayField}.$`;

  let query = {};
  query[subFieldId] = _id;

  let projection = {_id: 0};
  projection[subFieldQuery] = 1;

  return model.findOne(query, projection).then(result => {
    if (!result) throw new Error(model.toString() + 'not found');
    let picUrl = result[arrayField][0].url;
    return new Promise(resolve => {
      let filePath = RESOURCES_DIR + picUrl;
      fs.unlink(filePath, function (err) {
        if (err) throw err;
        resolve(filePath);
      });
    });
  })
};

const modifyFileName = fileName => crypto.pseudoRandomBytes(8).toString('hex') + '-' + sanitizeFileName(fileName);

const sanitizeFileName = fileName => fileName.replace(/[\s\\/]+/g, "-");

const checkIfFileIsPic = fileBuf => new Promise((resolve, reject) => {
  magic.detect(fileBuf, function (err, result) {
    if (err) throw err;
    let validPicTypes = ["image/gif", "image/jpeg", "image/png"];
    if (validPicTypes.indexOf(result) > -1) {
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
  ensurePicAndWriteToDisk,
  removeExistingPicFile
};
