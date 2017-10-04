require('../config/config');
const mongoose = require('../db/mongoose');
const fs = require('fs');
const {
  populateAdmins, populateHomePage, populateTeamMembers,
  populateProjects, populateActivities
} = require('./seedInfo');

const {RESOURCES_DIR} = process.env;

if (!fs.existsSync(RESOURCES_DIR)) {
  fs.mkdirSync(RESOURCES_DIR);
}

Promise.all([
  populateAdmins(),
  populateHomePage(),
  populateTeamMembers(),
  populateProjects(),
  populateActivities()
]).then(() => {
  mongoose.connection.close();
});
