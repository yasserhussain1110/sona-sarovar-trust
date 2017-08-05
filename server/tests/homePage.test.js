const request = require('supertest');
const app = require('../server');
const fs = require('fs');
const {INIT_ADMIN, populateAdmins, populateHomePage, populateTeamMembers, populateProjects} = require('../seed/seedInfo');
const {RESOURCES_DIR} = process.env;

before(done => {
  if (!fs.existsSync(RESOURCES_DIR)) {
    fs.mkdirSync(RESOURCES_DIR);
  }
  Promise.all([populateAdmins(), populateHomePage(), populateTeamMembers(), populateProjects()])
    .then(() => {
      done();
    });
});

beforeEach(done => {
  populateHomePage().then(() => done());
});


describe('Testing path /home-page/center-pic', () => {
  it("should add a new pic", done => {
    request(app)
      .put('/home-page/center-pic')
      .set('x-auth', INIT_ADMIN.tokens[0])
      .attach('pic', 'server/tests/files/sun.jpg')
      .expect(200)
      .end(done);
  });
});
