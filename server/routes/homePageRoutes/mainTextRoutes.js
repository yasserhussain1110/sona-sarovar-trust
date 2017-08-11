const auth = require('../../middleware/auth');
const HomePage = require('../../models/homepage');

const mainTextRoutes = app => {
  app.patch('/api/home-page/mainText/para1', auth, (req, res) => {
    let text = req.body.text;

    HomePage.update({}, {
      $set: {
        'mainTextPara1': text
      }
    }).then(() => {
      res.status(200).send();
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });
  });

  app.patch('/api/home-page/mainText/para2', auth, (req, res) => {
    let text = req.body.text;

    HomePage.update({}, {
      $set: {
        'mainTextPara2': text
      }
    }).then(() => {
      res.status(200).send();
    }).catch(e => {
      console.log(e);
      res.status(400).send();
    });
  });
};

module.exports = mainTextRoutes;
