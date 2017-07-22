require('../config/config');
const mongoose = require('../db/mongoose');
const Admin = require('../models/admin');
const HomePage = require('../models/homepage');
const TeamMember = require('../models/teammember');
const Project = require('../models/project');
const {INIT_ADMIN, INIT_HOME_PAGE, INIT_TEAM_MEMBERS, INIT_PROJECTS} = require('./init');

Promise.all([Admin.remove({}), HomePage.remove({}), TeamMember.remove({}), Project.remove({})])
  .then(() => {
    return Promise.all([
      new Admin(INIT_ADMIN).save(),
      HomePage.insertMany(INIT_HOME_PAGE),
      TeamMember.insertMany(INIT_TEAM_MEMBERS),
      Project.insertMany(INIT_PROJECTS)
    ]);
  })
  .then(() => {
    mongoose.connection.close();
  });
