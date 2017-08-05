require('../config/config');
const mongoose = require('../db/mongoose');
const fs = require('fs');
const {RESOURCES_DIR} = process.env;
const {populateAdmins, populateHomePage, populateTeamMembers, populateProjects} = require('./seedInfo');

if (!fs.existsSync(RESOURCES_DIR)) {
  fs.mkdirSync(RESOURCES_DIR);
}

Promise.all([populateAdmins(), populateHomePage(), populateTeamMembers(), populateProjects()])
  .then(() => {
    mongoose.connection.close();
  });
