let multer = require('multer');
let upload = multer({dest: 'uploads/'});

const homePageRoutes = app => {
  app.put('/upload', upload.single('pic'), (req, res) => {
    console.log(req.file);
    res.status(200).send();
  });
};

module.exports = homePageRoutes;
