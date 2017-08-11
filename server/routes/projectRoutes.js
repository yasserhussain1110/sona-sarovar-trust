const auth = require('../middleware/auth');
const Project = require('../models/project');
const multer = require('multer');
const upload = multer();
const {ensureImageAndWriteToDisk, removeExistingImageFile} = require('../services');
const {RESOURCES_DIR} = process.env;

const projectRoutes = app => {
  app.patch('/api/project/:_id', auth, (req, res) => {
    let {name, description} = req.body;
    let _id = req.params._id;
    if (!name || !description) {
      return res.status(400).send();
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

  app.patch('/api/project/pic/:_id', auth, upload.single('pic'), (req, res) => {
    if (!req.file) return res.status(400).send();

    let _id = req.params._id;
    let file = req.file;

    Project.findOne({'pics._id': _id})
      .then(() => {
        return ensureImageAndWriteToDisk(file, RESOURCES_DIR + '/projects');
      })
      .then(imagePath => {
        let imageUrl = imagePath.replace(RESOURCES_DIR, "");
        return Project.update({
          'pics._id': _id
        }, {
          $set: {
            "pics.$.url": imageUrl
          }
        }).then(() => imageUrl);
      })
      .then(imageUrl => {
        res.send({imageUrl});
      })
      .catch(e => {
        console.log(e);
        res.status(400).send();
      });
  });

  app.put('/api/project', auth, (req, res) => {
    let {name, description} = req.body;
    if (!name || !description) {
      return res.status(400).send();
    }

    new Project({
      name,
      description,
      pics: []
    }).save().then(p => {
      res.send(p);
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });
  });

  app.put('/api/project/pic/:_id', auth, upload.single('pic'), (req, res) => {
    if (!req.file) return res.status(400).send();

    let _id = req.params._id;
    let file = req.file;

    Project.findById(_id)
      .then(p => {
        return ensureImageAndWriteToDisk(file, RESOURCES_DIR + '/projects').then(imagePath => ({p, imagePath}));
      })
      .then(({project, imagePath}) => {
        let imageUrl = imagePath.replace(RESOURCES_DIR, "");
        project.pics.push({url: imageUrl});
        return project.save().then(() => imageUrl);
      })
      .then(imageUrl => {
        res.send({imageUrl});
      })
      .catch(e => {
        console.log(e);
        res.status(400).send();
      });
  });

  app.delete('/api/project/:_id', auth, (req, res) => {
    let _id = req.params._id;

    Project.findById(_id).then(project => {
      let projectPicIds = project.pics.map(picObj => picObj._id);
      return Promise.all(projectPicIds.map(_id => {
        return removeExistingImageFile(Project, 'pics', _id);
      }));
    }).then(() => {
      return Project.remove({_id});
    }).then(() => {
      res.status(200).send();
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });
  });

  app.delete('/api/project/pic/:_id', auth, (req, res) => {
    let _id = req.params._id;

    Project.findOne({
      'pics._id': _id
    }).then(() => {
      return removeExistingImageFile(Project, 'pics', _id);
    }).then(() => {
      return Project.update({'pics._id': _id}, {
        $pull: {
          pics: {_id}
        }
      });
    }).then(() => {
      res.status(200).send();
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });
  });
};

module.exports = projectRoutes;
