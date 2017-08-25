const request = require('supertest');
const app = require('../../server/server');
const fs = require('fs');
const {
  INIT_ADMIN,
  populateAdmins, populateHomePage,
  populateTeamMembers, populateProjects
} = require('../../server/seed/seedInfo');
const {RESOURCES_DIR} = process.env;

before(done => {
  if (!fs.existsSync(RESOURCES_DIR)) {
    fs.mkdirSync(RESOURCES_DIR);
  }
  Promise.all([populateAdmins(), populateHomePage(), populateTeamMembers(), populateProjects()])
    .then(() => done());
});

beforeEach(done => {
  populateHomePage().then(() => done());
});


describe('Testing path PUT /home-page/center-pic', () => {
  it("should add a new pic", done => {
    request(app)
      .put('/api/home-page/center-pic')
      .set('x-auth', INIT_ADMIN.tokens[0])
      .attach('pic', 'test/server/files/sun.jpg')
      .expect(200)
      .end(done);
  });
});
