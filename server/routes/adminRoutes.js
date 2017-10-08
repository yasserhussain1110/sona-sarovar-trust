const Admin = require('../models/admin');
const auth = require('../middleware/auth');
const logger = require('../config/logger');

const adminRoutes = app => {
  app.post('/api/admin/login', (req, res) => {
    const {username, password} = req.body;

    Admin.findByCreds(username, password)
      .then(user => user.generateAuthToken())
      .then(token => {
        res.header('x-auth', token).send();
      })
      .catch(e => {
        logger.error(e.message, e);
        res.status(400).send();
      });
  });

  app.get('/api/admin/isLoggedIn', auth, (req, res) => {
    res.send({loggedIn: true});
  });
};

module.exports = adminRoutes;
