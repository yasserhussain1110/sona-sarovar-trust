const auth = require('../middleware/auth');
const Project = require('../models/project');
const multer = require('multer');
const upload = multer();

const projectRoutes = app => {
  app.patch('/project/:_id', auth, (req, res) => {
    let {name, description} = req.body;
    let _id = req.params._id;
    if (!name || !description) {
      return res.send(400);
    }

    Project.update({_id}, {
      $set: {
        name,
        description
      }
    }).then(() => {
      res.status(200).send();
    })
  });

  app.patch('/project/pic/:_id', auth, upload.single('pic'), (req, res) => {
    if (!req.file) return res.status(400).send();

  })
};

module.exports = projectRoutes;
