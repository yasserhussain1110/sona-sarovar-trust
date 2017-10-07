const request = require('supertest');
const app = require('../../server/server');
const fs = require('fs');
const {INIT_ADMIN, populateAll, populateHomePage} = require('../../server/seed/seedInfo');

const {RESOURCES_DIR} = process.env;
const testFileName = 'sun.jpg';
const constructFullPath = name => 'test/server/files/' + name;

before(done => {
  if (!fs.existsSync(RESOURCES_DIR)) {
    fs.mkdirSync(RESOURCES_DIR);
  }
  populateAll().then(() => done());
});

beforeEach(done => {
  populateHomePage().then(() => done());
});

describe('Testing path PUT /api/home-page/center-pic', () => {
  it('should add a new pic', done => {
    request(app)
      .put('/api/home-page/center-pic')
      .set('x-auth', INIT_ADMIN.tokens[0])
      .attach('pic', constructFullPath(testFileName))
      .expect(200)
      .end(done);
  });
});
