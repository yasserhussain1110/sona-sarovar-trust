const TeamMember = require('../models/teammember');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer();
const {ensureImageAndWriteToDisk, removeExistingImageFile} = require('../services');
const {RESOURCES_DIR} = process.env;

const teammemberRoutes = app => {
  app.put('/teammember', auth, upload.single('pic'), (req, res) => {
    let file = req.file;
    let {name, info} = req.body;

    if (!file) return res.status(400).send();
    if (!name || !info) return res.status(400).send();


    ensureImageAndWriteToDisk(file, RESOURCES_DIR + '/about')
      .then(imagePath => {
        let imageUrl = imagePath.replace(RESOURCES_DIR, "");
        return new TeamMember({
          name,
          info,
          pic: imageUrl
        }).save();
      })
      .then(teamMember => {
        res.send(teamMember);
      })
      .catch(e => {
        console.log(e);
        res.status(400).send();
      });
  });

  app.patch('/teammember/:_id', auth, upload.single('pic'), (req, res) => {
    let file = req.file;
    let {name, info} = req.body;
    let _id = req.params._id;

    TeamMember.findById(_id).then(member => {
      if (!member) throw new Error('No member by id - ' + _id);

      member.name = name;
      member.info = info;

      if (file) {
        return ensureImageAndWriteToDisk(file, RESOURCES_DIR + '/about').then(imagePath => {
          member.pic = imagePath.replace(RESOURCES_DIR, "");
          return member.save();
        });
      } else {
        return member.save();
      }
    }).then(member => {
      res.send(member);
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });
  });
};

module.exports = teammemberRoutes;
