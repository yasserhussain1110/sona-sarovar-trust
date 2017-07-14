const Admin = require('../models/admin');

const adminRoutes = app => {
  app.post('/login', (req, res) => {
    let {username, password} = req.body;

    Admin.findByCreds(username, password)
      .then(user => user.generateAuthToken())
      .then(token => {
        res.header('x-auth', token).send();
      })
      .catch(e => {
        console.log(e);
        res.status(400).send();
      });
  });
};

module.exports = adminRoutes;
