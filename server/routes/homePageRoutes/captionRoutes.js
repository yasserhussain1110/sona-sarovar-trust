const auth = require('../../middleware/auth');
const HomePage = require('../../models/homepage');

const captionRoutes = app => {
  app.put('/api/home-page/caption', auth, (req, res) => {
    let captionText = req.body.text;

    HomePage.update({
      $push: {
        captions: {text: captionText}
      }
    }).then(() => {
      return HomePage.findOne().then(h => {
        return h.captions[h.captions.length - 1];
      })
    }).then(caption => {
      res.send(caption);
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });
  });

  app.patch('/api/home-page/caption/:_id', auth, (req, res) => {
    let _id = req.params._id;
    let captionText = req.body.text;

    HomePage.update({
      'captions._id': _id
    }, {
      $set: {
        'captions.$.text': captionText
      }
    }).then(r => {
      if (r.n === 0) throw new Error("No caption found");
      res.status(200).send();
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });
  });

  app.delete('/api/home-page/caption/:_id', auth, (req, res) => {
    let _id = req.params._id;

    HomePage.update({
      $pull: {
        captions: {_id}
      }
    }).then(r => {
      if (r.nModified === 0) throw new Error("No match");
      res.status(200).send();
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });
  });
};

module.exports = captionRoutes;
