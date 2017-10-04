const auth = require('../../middleware/auth');
const HomePage = require('../../models/homepage');

const captionRoutes = app => {
  app.put('/api/home-page/caption', auth, (req, res) => {
    const captionText = req.body.text;

    HomePage.findOne().then(h => {
      if (!h) throw new Error('HomePage not found');
      h.captions.push({text: captionText});
      return h.save().then(h => h.captions[h.captions.length - 1]);
    }).then(caption => {
      res.send(caption);
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });
  });

  app.patch('/api/home-page/caption/:_id', auth, (req, res) => {
    const _id = req.params._id;
    const captionText = req.body.text;

    HomePage.update({
      'captions._id': _id
    }, {
      $set: {
        'captions.$.text': captionText
      }
    }, {
      runValidators: true
    }).then(r => {
      if (r.n === 0) throw new Error('No caption found');
      res.status(200).send();
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });
  });

  app.delete('/api/home-page/caption/:_id', auth, (req, res) => {
    const _id = req.params._id;

    /**
     * 'required' validators only fail when $unset is used.
     * They do **NOT** fail with $pull.
     * See:- https://github.com/Automattic/mongoose/issues/5234#issuecomment-304531431
     * So we are trying to find the doc, modify and update it below.
     */

    HomePage.findOne().then(h => {
      if (!h) throw new Error('HomePage not found.');
      const originalLength = h.captions.length;
      h.captions = h.captions.filter(caption => !caption._id.equals(_id));
      return h.save().then(() => ({originalLength, newLength: h.captions.length}));
    }).then(({originalLength, newLength}) => {
      if (newLength >= originalLength) throw new Error('No match. Same Number of captions');
      res.status(200).send();
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });

    // HomePage.update({
    //   $pull: {
    //     captions: {_id}
    //   }
    // }, {
    //   runValidators: true
    // }).then(r => {
    //   if (r.nModified === 0) throw new Error("No match");
    //   res.status(200).send();
    // }).catch(e => {
    //   console.log(e);
    //   res.status(400).send();
    // });
  });
};

module.exports = captionRoutes;
