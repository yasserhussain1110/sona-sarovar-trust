const HomePage = require('../models/homepage');
const Project = require('../models/project');
const TeamMember = require('../models/teammember');

const appStateRoutes = app => {
  app.get('/init-state', (req, res) => {
    Promise.all([HomePage.find(), Project.find(), TeamMember.find()])
      .then(([homePages, projects, teamMembers]) => {
        res.send({
          homePage: homePages[0],
          projects,
          teamMembers
        });
      });
  });
};


module.exports = appStateRoutes;
