const Admin = require('../models/admin');

const auth = (req, res, next) => {
  let token = req.get('x-auth');
  Admin.findByToken(token).then(admin => {
    if (!admin) {
      return Promise.reject("No such Admin");
    }

    req.admin = admin;
    req.token = token;
    next();
  }).catch(e => {
    res.status(401).send();
  });
};

module.exports = auth;
