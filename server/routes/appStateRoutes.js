const HomePage = require('../models/homepage');
const Project = require('../models/project');
const Activity = require('../models/activity');
const TeamMember = require('../models/teammember');

const appStateRoutes = app => {
  app.get('/api/init-state', (req, res) => {
    Promise.all([HomePage.findOne(), Project.find(), TeamMember.find(), Activity.find()])
      .then(([homePage, projects, teamMembers, activities]) => {
        res.send({
          homePage,
          projects,
          teamMembers,
          activities
        });
      });
  });
};


module.exports = appStateRoutes;
