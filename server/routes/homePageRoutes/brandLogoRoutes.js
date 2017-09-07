const multer = require('multer');
const auth = require('../../middleware/auth');
const HomePage = require('../../models/homepage');
const fs = require('fs');
const upload = multer();
const {ensurePicAndWriteToDisk} = require('../../services');
const {RESOURCES_DIR} = process.env;

const brandLogoRoutes = app => {
  app.patch('/api/home-page/brand-logo', auth, upload.single('pic'), (req, res) => {
    if (!req.file) return res.status(400).send();

    let file = req.file;

    ensurePicAndWriteToDisk(file, RESOURCES_DIR + '/home')
      .then(picPath => {
        return picPath.replace(RESOURCES_DIR, "");
      })
      .then(picUrl => {
        return HomePage.findOne().then(homePage => {
          let filePath = RESOURCES_DIR + homePage.brandLogoUrl;
          fs.unlinkSync(filePath);
          homePage.brandLogoUrl = picUrl;
          return homePage.save().then(() => picUrl);
        });
      })
      .then(picUrl => {
        res.status(200).send({url: picUrl});
      })
      .catch(err => {
        console.log(err);
        res.status(400).send();
      });
  });
};

module.exports = brandLogoRoutes;
