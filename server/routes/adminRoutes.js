const Admin = require('../models/admin');

const adminRoutes = app => {
  app.post('/login', (req, res) => {
    let {username, password} = req.body;

    Admin.findByCreds(username, password)
      .then(user => user.generateAuthToken())
      .then(token => {
        res.status(200).send(token);
      })
      .catch(e => {
        console.log(e);
        res.status(400);
      });
  });
};

module.exports = adminRoutes;
