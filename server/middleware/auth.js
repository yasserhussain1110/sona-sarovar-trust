const Admin = require('../models/admin');

const auth = (req, res, next) => {
  const token = req.get('x-auth');
  Admin.findByToken(token).then(admin => {
    if (!admin) {
      return Promise.reject(Error('No such Admin'));
    }

    req.admin = admin;
    req.token = token;
    next();
  }).catch(() => {
    res.status(401).send();
  });
};

module.exports = auth;
