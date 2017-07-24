const {INIT_ADMIN_USERNAME, INIT_ADMIN_PASSWORD} = process.env;

const INIT_ADMIN = {
  username: INIT_ADMIN_USERNAME,
  password: INIT_ADMIN_PASSWORD
};

const INIT_HOME_PAGE = {
  centerPics: ["/home/IMG1.jpg", "/home/IMG2.jpg"],
  captions: [
    "66% of street children in Mumbai never receive any education.",
    "You can make a difference in their lives.",
    "Come, join our hands in helping improve their lives."
  ],
  mainTextPara1: "I'm a paragraph. Click here to add your own text and edit me. "
  + "It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. "
  + "Feel free to drag and drop me anywhere you like on your page. "
  + "I’m a great place for you to tell a story and let your users know a little more about you.",
  mainTextPara2: "This is a great space to write long text about your company and your services. "
  + "You can use this space to go into a little more detail about your company. "
  + "Talk about your team and what services you provide."
};

const INIT_TEAM_MEMBERS = [{
  name: "Member 1",
  info: "Roman Infantry 1",
  pic: "/about/person.png"
}, {
  name: "Member 2",
  info: "Roman Infantry 2",
  pic: "/about/person.png"
}, {
  name: "Member 3",
  info: "Roman Infantry 3",
  pic: "/about/person.png"
}];

const INIT_PROJECTS = [{
  name: "Project 1",
  info: "Project Desc 1",
  pics: ["/projects/project1.jpg", "/projects/project2.jpg"]
}, {
  name: "Project 2",
  info: "Project Desc 2",
  pics: ["/projects/project1.jpg", "/projects/project2.jpg"]
}];

module.exports = {
  INIT_ADMIN,
  INIT_HOME_PAGE,
  INIT_TEAM_MEMBERS,
  INIT_PROJECTS
};
