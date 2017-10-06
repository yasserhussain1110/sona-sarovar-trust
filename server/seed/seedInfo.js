const jwt = require('jsonwebtoken');
const {ObjectID} = require('mongodb');
const Admin = require('../models/admin');
const HomePage = require('../models/homepage');
const TeamMember = require('../models/teammember');
const Project = require('../models/project');
const Activity = require('../models/activity');
const AboutUs = require('../models/aboutus');
const ncp = require('ncp').ncp;
const {INIT_ADMIN_USERNAME, INIT_ADMIN_PASSWORD, JWT_SECRET_KEY, RESOURCES_DIR} = process.env;

const INIT_ADMIN_ID = new ObjectID();
const INIT_ADMIN = {
  _id: INIT_ADMIN_ID,
  username: INIT_ADMIN_USERNAME,
  password: INIT_ADMIN_PASSWORD,
  tokens: [jwt.sign({_id: INIT_ADMIN_ID.toHexString()}, JWT_SECRET_KEY)]
};

const INIT_HOME_PAGE = {
  centerPics: [{
    _id: new ObjectID(),
    url: "/home/IMG1.jpg"
  }, {
    _id: new ObjectID(),
    url: "/home/IMG2.jpg"
  }],
  brandLogoUrl: "/home/logo.jpg",
  captions: [
    {text: "66% of street children in Mumbai never receive any education."},
    {text: "You can make a difference in their lives."},
    {text: "Come, join our hands in helping improve their lives."}
  ]
};

const INIT_ABOUT_US = {
  vision: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
  "Nulla fermentum nisi sit amet odio tempor, vel fringilla metus porttitor. " +
  "Curabitur eu efficitur elit. Ut consequat libero id varius aliquam. Nulla placerat viverra aliquet. " +
  "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. " +
  "Nunc vestibulum libero in nunc faucibus sagittis. In a ipsum leo. Cras auctor massa non euismod hendrerit. " +
  "Ut viverra quam sit amet enim rutrum volutpat. Aenean hendrerit nulla ac urna dignissim posuere. " +
  "Pellentesque non bibendum metus, vel tempor est. Pellentesque laoreet posuere enim, ac viverra nibh " +
  "lacinia sit amet. Pellentesque sit amet rhoncus massa, ut maximus justo.",

  mission: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
  "Nulla fermentum nisi sit amet odio tempor, vel fringilla metus porttitor. " +
  "Curabitur eu efficitur elit. Ut consequat libero id varius aliquam. Nulla placerat viverra aliquet. " +
  "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. " +
  "Nunc vestibulum libero in nunc faucibus sagittis. In a ipsum leo. Cras auctor massa non euismod hendrerit. " +
  "Ut viverra quam sit amet enim rutrum volutpat. Aenean hendrerit nulla ac urna dignissim posuere. " +
  "Pellentesque non bibendum metus, vel tempor est. Pellentesque laoreet posuere enim, ac viverra nibh " +
  "lacinia sit amet. Pellentesque sit amet rhoncus massa, ut maximus justo.",

  history: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
  "Nulla fermentum nisi sit amet odio tempor, vel fringilla metus porttitor. " +
  "Curabitur eu efficitur elit. Ut consequat libero id varius aliquam. Nulla placerat viverra aliquet. " +
  "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. " +
  "Nunc vestibulum libero in nunc faucibus sagittis. In a ipsum leo. Cras auctor massa non euismod hendrerit. " +
  "Ut viverra quam sit amet enim rutrum volutpat. Aenean hendrerit nulla ac urna dignissim posuere. " +
  "Pellentesque non bibendum metus, vel tempor est. Pellentesque laoreet posuere enim, ac viverra nibh " +
  "lacinia sit amet. Pellentesque sit amet rhoncus massa, ut maximus justo."
};

const INIT_TEAM_MEMBERS = [{
  _id: new ObjectID(),
  name: "Member 1",
  info: "Roman Infantry 1",
  pic: "/team/person1.png",
  type: "Volunteer"
}, {
  name: "Member 2",
  info: "Roman Infantry 2",
  pic: "/team/person2.png",
  type: "Trustee"
}, {
  name: "Member 3",
  info: "Roman Infantry 3",
  pic: "/team/person3.png",
  type: "BrandAmbassador"
}, {
  name: "Member 4",
  info: "Roman Infantry 4",
  pic: "/team/person4.png",
  type: "Technical"
}];

const INIT_PROJECTS = [{
  _id: new ObjectID(),
  name: "Project XYZ",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
  "Nulla fermentum nisi sit amet odio tempor, vel fringilla metus porttitor. " +
  "Curabitur eu efficitur elit. Ut consequat libero id varius aliquam. Nulla placerat viverra aliquet. " +
  "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. " +
  "Nunc vestibulum libero in nunc faucibus sagittis. In a ipsum leo. Cras auctor massa non euismod hendrerit. " +
  "Ut viverra quam sit amet enim rutrum volutpat. Aenean hendrerit nulla ac urna dignissim posuere. " +
  "Pellentesque non bibendum metus, vel tempor est. Pellentesque laoreet posuere enim, ac viverra nibh " +
  "lacinia sit amet. Pellentesque sit amet rhoncus massa, ut maximus justo.",
  pics: [{_id: new ObjectID(), url: "/projects/project1.jpg"}, {url: "/projects/project2.jpg"}]
}, {
  _id: new ObjectID(),
  name: "Project ABC",
  description: "Fusce commodo porta molestie. Vestibulum ac tellus condimentum, auctor felis sed, pharetra eros. " +
  "Sed placerat eget elit ut feugiat. Pellentesque nec dictum lorem. Morbi luctus dignissim arcu et venenatis. " +
  "Fusce ac fringilla lorem. Morbi pharetra at ex in sollicitudin. Donec commodo, nulla et mollis finibus, " +
  "mauris dolor eleifend nisl, eget cursus arcu leo id risus.",
  pics: [{url: "/projects/project3.jpg"}, {url: "/projects/project4.jpg"}]
}];

const INIT_ACTIVITIES = [{
  _id: new ObjectID(),
  name: "Card Making",
  description: "Fusce commodo porta molestie. Vestibulum ac tellus condimentum, auctor felis sed, pharetra eros. " +
  "Sed placerat eget elit ut feugiat. Pellentesque nec dictum lorem. Morbi luctus dignissim arcu et venenatis. " +
  "Fusce ac fringilla lorem. Morbi pharetra at ex in sollicitudin. Donec commodo, nulla et mollis finibus, " +
  "mauris dolor eleifend nisl, eget cursus arcu leo id risus.",
  pics: [{url: "/activities/Card1.jpg"}, {url: "/activities/Card2.jpg"}, {url: "/activities/Card3.jpg"}]
}, {
  _id: new ObjectID(),
  name: "Social Activities",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " +
  "Nulla fermentum nisi sit amet odio tempor, vel fringilla metus porttitor. " +
  "Curabitur eu efficitur elit. Ut consequat libero id varius aliquam. Nulla placerat viverra aliquet. " +
  "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. " +
  "Nunc vestibulum libero in nunc faucibus sagittis. In a ipsum leo. Cras auctor massa non euismod hendrerit. " +
  "Ut viverra quam sit amet enim rutrum volutpat.",
  pics: [{url: "/activities/social1.jpg"}, {url: "/activities/social2.jpg"}]
}];

const populateAdmins = () => {
  return Admin.remove({}).then(() => {
    return new Admin(INIT_ADMIN).save();
  });
};

const populateHomePage = () => {
  let sourceHomeDir = "initResources/home";
  let targetHomeDir = RESOURCES_DIR + "/home";

  return new Promise(resolve => {
    ncp(sourceHomeDir, targetHomeDir, function (err) {
      if (err)  throw err;
      resolve()
    });
  }).then(() => {
    return HomePage.remove({});
  }).then(() => {
    return HomePage.insertMany(INIT_HOME_PAGE);
  });
};

const populateAboutUs = () => {
  return AboutUs.remove({}).then(() => {
    return new AboutUs(INIT_ABOUT_US).save();
  });
};

const populateTeamMembers = () => {
  let sourceAboutDir = "initResources/team";
  let targetAboutDir = RESOURCES_DIR + "/team";

  return new Promise(resolve => {
    ncp(sourceAboutDir, targetAboutDir, function (err) {
      if (err)  throw err;
      resolve()
    });
  }).then(() => {
    return TeamMember.remove({});
  }).then(() => {
    return TeamMember.insertMany(INIT_TEAM_MEMBERS);
  });
};

const populateProjects = () => {
  let sourceProjectsDir = "initResources/projects";
  let targetProjectsDir = RESOURCES_DIR + "/projects";

  return new Promise(resolve => {
    ncp(sourceProjectsDir, targetProjectsDir, function (err) {
      if (err)  throw err;
      resolve()
    });
  }).then(() => {
    return Project.remove({});
  }).then(() => {
    return Project.insertMany(INIT_PROJECTS);
  });
};

const populateActivities = () => {
  let sourceProjectsDir = "initResources/activities";
  let targetProjectsDir = RESOURCES_DIR + "/activities";

  return new Promise(resolve => {
    ncp(sourceProjectsDir, targetProjectsDir, function (err) {
      if (err)  throw err;
      resolve()
    });
  }).then(() => {
    return Activity.remove({});
  }).then(() => {
    return Activity.insertMany(INIT_ACTIVITIES);
  });
};

const populateAll = () => {
  return Promise.all([
    populateAdmins(), populateHomePage(), populateAboutUs(),
    populateTeamMembers(), populateProjects(), populateActivities()
  ]);
};

module.exports = {
  INIT_ADMIN,
  INIT_HOME_PAGE,
  INIT_TEAM_MEMBERS,
  INIT_PROJECTS,
  INIT_ACTIVITIES,
  populateAll,
  populateAdmins,
  populateHomePage,
  populateAboutUs,
  populateTeamMembers,
  populateProjects,
  populateActivities
};
