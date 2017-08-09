const HomePage = require('../models/homepage');
const Project = require('../models/project');
const TeamMember = require('../models/teammember');

const appStateRoutes = app => {
  app.get('/init-state', (req, res) => {
    Promise.all([HomePage.findOne(), Project.find(), TeamMember.find()])
      .then(([homePage, projects, teamMembers]) => {
        res.send({
          homePage,
          projects,
          teamMembers
        });
      });
  });
};


module.exports = appStateRoutes;
