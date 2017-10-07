const multer = require('multer');
const auth = require('../../middleware/auth');
const HomePage = require('../../models/homepage');
const fs = require('fs');
const {ensurePicAndWriteToDisk} = require('../../services');

const upload = multer();
const {RESOURCES_DIR} = process.env;

const brandLogoRoutes = app => {
  app.patch('/api/home-page/brand-logo', auth, upload.single('pic'), (req, res) => {
    if (!req.file) return res.status(400).send();

    const file = req.file;

    HomePage.findOne()
      .then(h => {
        if (!h) throw new Error('HomePage not found');
        return ensurePicAndWriteToDisk(file, RESOURCES_DIR + '/home').then(picPath => ({picPath, h}));
      })
      .then(({picPath, h}) => {
        const newPicUrl = picPath.replace(RESOURCES_DIR, '');
        const oldPicPath = RESOURCES_DIR + h.brandLogoUrl;
        fs.unlinkSync(oldPicPath);
        h.brandLogoUrl = newPicUrl;
        return h.save().then(h => h.brandLogoUrl);
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
