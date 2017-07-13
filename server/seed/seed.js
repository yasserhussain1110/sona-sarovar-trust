require('../config/config');
const mongoose = require('../db/mongoose');
const Admin = require('../models/admin');

const {INIT_ADMIN_USERNAME, INIT_ADMIN_PASSWORD} = process.env;

Admin.remove({}).then(() => {
  const initAdmin = new Admin({
    username: INIT_ADMIN_USERNAME,
    password: INIT_ADMIN_PASSWORD
  });
  return initAdmin.save();
}).then(() => {
  mongoose.connection.close();
});


