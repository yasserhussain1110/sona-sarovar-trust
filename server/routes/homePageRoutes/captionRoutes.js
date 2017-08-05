const auth = require('../../middleware/auth');
const HomePage = require('../../models/homepage');

const captionRoutes = app => {
  app.put('/home-page/caption', auth, (req, res) => {
    let caption = req.body.caption;

    HomePage.update({
      $push: {
        captions: {text: caption}
      }
    }).then(() => {
      res.status(200).send();
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });
  });

  app.patch('/home-page/caption/:_id', auth, (req, res) => {
    let _id = req.params._id;
    let caption = req.body.caption;

    HomePage.update({
      'captions._id': _id
    }, {
      $set: {
        'captions.$.text': caption
      }
    }).then(() => {
      res.status(200).send();
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });
  });

  app.delete('/home-page/caption/:_id', auth, (req, res) => {
    let _id = req.params._id;

    HomePage.update({
      $pull: {
        centerPics: {_id}
      }
    }).then(() => {
      res.status(200).send();
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });
  });
};

module.exports = captionRoutes;
