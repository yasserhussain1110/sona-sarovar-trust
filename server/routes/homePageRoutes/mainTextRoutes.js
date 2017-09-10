const auth = require('../../middleware/auth');
const HomePage = require('../../models/homepage');

const mainTextRoutes = app => {
  app.patch('/api/home-page/mainText/para1', auth, (req, res) => {
    let text = req.body.text;

    HomePage.update({}, {
      $set: {
        'mainTextPara1': text
      }
    }, {
      runValidators: true
    }).then(() => {
      res.status(200).send();
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });


    /*
     * Had to use the following method because mongoose was not running validators
     * Fixed the issue by adding '{runValidators: true}' option.
     * See:- https://stackoverflow.com/questions/15627967/why-mongoose-doesnt-validate-on-update
     */
    // HomePage.findOne().then(h => {
    //   h.mainTextPara1 = text;
    //   return h.save();
    // }).then(() => {
    //   res.status(200).send();
    // }).catch(e => {
    //   console.log(e);
    //   res.status(400).send();
    // });
  });

  app.patch('/api/home-page/mainText/para2', auth, (req, res) => {
    let text = req.body.text;

    HomePage.update({}, {
      $set: {
        'mainTextPara2': text
      }
    }, {
      runValidators: true
    }).then(() => {
      res.status(200).send();
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });
  });
};

module.exports = mainTextRoutes;
