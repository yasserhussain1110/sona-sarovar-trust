const expect = require('expect');
const fs = require('fs');
const {INIT_HOME_PAGE, populateAll} = require('../../server/seed/seedInfo');
const {removeExistingPicFile} = require('../../server/services');
const HomePage = require('../../server/models/homepage');
const {RESOURCES_DIR} = process.env;

before(done => {
  if (!fs.existsSync(RESOURCES_DIR)) {
    fs.mkdirSync(RESOURCES_DIR);
  }
  populateAll().then(() => done());
});

describe('Testing file Services', () => {
  it("should remove pic", done => {
    removeExistingPicFile(HomePage, 'centerPics', INIT_HOME_PAGE.centerPics[0]._id.toHexString())
      .then(path => {
        expect(fs.existsSync(RESOURCES_DIR + INIT_HOME_PAGE.centerPics[0].url)).toBe(false);
        done();
      });
  });
});
