require('../config/configEnv');
const mongoose = require('../db/mongoose');
const fs = require('fs');
const {populateAll} = require('./seedInfo');

const {RESOURCES_DIR} = process.env;

if (!fs.existsSync(RESOURCES_DIR)) {
  fs.mkdirSync(RESOURCES_DIR);
}

populateAll().then(() => {
  mongoose.connection.close();
});
