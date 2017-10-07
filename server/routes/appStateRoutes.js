const HomePage = require('../models/homepage');
const Project = require('../models/project');
const Activity = require('../models/activity');
const TeamMember = require('../models/teammember');
const AboutUs = require('../models/aboutus');

const appStateRoutes = app => {
  app.get('/api/init-state', (req, res) => {
    Promise.all([
      HomePage.findOne(),
      AboutUs.findOne(),
      Project.find(),
      TeamMember.find(),
      Activity.find()
    ]).then(([homePage, aboutUs, projects, teamMembers, activities]) => {
      res.send({
        homePage,
        aboutUs,
        projects,
        teamMembers,
        activities
      });
    });
  });
};


module.exports = appStateRoutes;
