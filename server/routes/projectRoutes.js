const auth = require('../middleware/auth');
const Project = require('../models/project');
const multer = require('multer');
const {
  ensurePicAndWriteToDisk,
  removeExistingPicFile
} = require('../services');

const upload = multer();
const {RESOURCES_DIR} = process.env;


const reflectFilePromise = (promise, file) => (
  promise.then(picUrl => ({
    resolved: true,
    rejected: false,
    value: picUrl,
    originalFileName: file.originalname
  })).catch(e => ({
    resolved: false,
    rejected: true,
    reason: e,
    originalFileName: file.originalname
  }))
);

const projectRoutes = app => {
  app.put('/api/project', auth, upload.array('pics'), (req, res) => {
    const {name, description} = req.body;

    if (!name || !description) {
      return res.status(400).send();
    }

    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send();
    }

    Promise
      .all(files.map(file => {
        const fileWritePromise = ensurePicAndWriteToDisk(file, RESOURCES_DIR + '/projects');
        return reflectFilePromise(fileWritePromise, file);
      }))
      .then(result => {
        const resolvedPromises = result.filter(p => p.resolved);
        if (resolvedPromises.length === 0) throw new Error('Nothing could be saved');
        const rejectedPromises = result.filter(p => p.rejected);
        const savedPicUrls = resolvedPromises.map(p => p.value.replace(RESOURCES_DIR, ''));
        const nonPicFileNames = rejectedPromises.map(p => p.originalFileName);
        return {
          savedPicUrls,
          nonPicFileNames
        };
      })
      .then(({savedPicUrls, nonPicFileNames}) => {
        return new Project({
          name,
          description,
          pics: savedPicUrls.map(url => ({url}))
        }).save().then(project => ({project, nonPicFileNames}));
      })
      .then(({project, nonPicFileNames}) => {
        res.send({
          project,
          nonPicFileNames
        });
      })
      .catch(e => {
        console.log(e.stack);
        res.status(400).send();
      });
  });

  app.put('/api/project/pic/:_id', auth, upload.single('pic'), (req, res) => {
    if (!req.file) return res.status(400).send();

    const _id = req.params._id;
    const file = req.file;

    Project.findById(_id)
      .then(project => {
        if (!project) throw new Error('Could not find project.');
        return ensurePicAndWriteToDisk(file, RESOURCES_DIR + '/projects')
          .then(picPath => ({project, picPath}));
      })
      .then(({project, picPath}) => {
        const picUrl = picPath.replace(RESOURCES_DIR, '');
        project.pics.push({url: picUrl});
        return project.save().then(() => project.pics[project.pics.length - 1]);
      })
      .then(pic => {
        res.send(pic);
      })
      .catch(e => {
        console.log(e.stack);
        res.status(400).send();
      });
  });


  app.patch('/api/project/:_id', auth, (req, res) => {
    const {name, description} = req.body;
    const _id = req.params._id;
    if (!name || !description) {
      return res.status(400).send();
    }

    Project.update({_id}, {
      $set: {
        name,
        description
      }
    }, {
      runValidators: true
    }).then(() => {
      res.status(200).send();
    });
  });

  app.patch('/api/project/pic/:_id', auth, upload.single('pic'), (req, res) => {
    if (!req.file) return res.status(400).send();

    const _id = req.params._id;
    const file = req.file;

    Project.findOne({'pics._id': _id})
      .then(p => {
        if (!p) throw new Error('Could not find project pic.');
        return ensurePicAndWriteToDisk(file, RESOURCES_DIR + '/projects');
      })
      .then(picPath => {
        const picUrl = picPath.replace(RESOURCES_DIR, '');
        return Project.update({
          'pics._id': _id
        }, {
          $set: {
            'pics.$.url': picUrl
          }
        }, {
          runValidators: true
        }).then(() => picUrl);
      })
      .then(picUrl => {
        res.send({url: picUrl});
      })
      .catch(e => {
        console.log(e.stack);
        res.status(400).send();
      });
  });

  app.delete('/api/project/:_id', auth, (req, res) => {
    const _id = req.params._id;

    Project.findById(_id).then(project => {
      if (!project) throw new Error('Could not find project.');
      const projectPicIds = project.pics.map(picObj => picObj._id);
      return Promise.all(projectPicIds.map(_id => {
        return removeExistingPicFile(Project, 'pics', _id);
      }));
    }).then(() => {
      return Project.remove({_id});
    }).then(() => {
      res.status(200).send();
    }).catch(e => {
      console.log(e.stack);
      res.status(400).send();
    });
  });

  app.delete('/api/project/pic/:_id', auth, (req, res) => {
    const _id = req.params._id;

    Project.findOne({
      'pics._id': _id
    }).then(p => {
      if (!p) throw new Error('Could not find project pic.');
      if (p.pics.length === 1) throw new Error('Only one pic remaining. Cannot delete it.');
      return removeExistingPicFile(Project, 'pics', _id);
    }).then(() => {
      return Project.update({'pics._id': _id}, {
        $pull: {
          pics: {_id}
        }
      });
    }).then(() => {
      res.status(200).send();
    }).catch(e => {
      console.log(e.stack);
      res.status(400).send();
    });
  });
};

module.exports = projectRoutes;
