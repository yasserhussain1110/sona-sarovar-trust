require('../config/config');
const mongoose = require('../db/mongoose');
const fs = require('fs');
const {RESOURCES_DIR} = process.env;
const {
  populateAdmins, populateHomePage, populateAboutUs,
  populateTeamMembers, populateProjects, populateActivities
} = require('./seedInfo');

if (!fs.existsSync(RESOURCES_DIR)) {
  fs.mkdirSync(RESOURCES_DIR);
}

Promise.all([
  populateAdmins(), populateHomePage(), populateAboutUs(),
  populateTeamMembers(), populateProjects(), populateActivities()
]).then(() => {
  mongoose.connection.close();
});
