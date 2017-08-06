const request = require('supertest');
const expect = require('expect');
const app = require('../server');
const fs = require('fs');
const Project = require('../models/project');
const {
  INIT_PROJECTS, INIT_ADMIN,
  populateAdmins, populateHomePage, populateTeamMembers, populateProjects
} = require('../seed/seedInfo');
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
  populateProjects().then(() => done());
});


describe('Testing path DELETE /project/:_id', () => {
  it("should delete a whole project", done => {
    request(app)
      .delete(`/project/${INIT_PROJECTS[0]._id}`)
      .set('x-auth', INIT_ADMIN.tokens[0])
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let pics = INIT_PROJECTS[0].pics;
        pics.forEach(pic => {
          expect(fs.existsSync(RESOURCES_DIR + pic.url)).toBe(false);
        });

        Project.findById(INIT_PROJECTS[0]._id).then(p => {
          expect(p).toNotExist();
          done();
        });
      });
  });
});

describe('Testing path DELETE /project/pic/:_id', () => {
  it("should delete a pic of a project", done => {
    request(app)
      .delete(`/project/pic/${INIT_PROJECTS[0].pics[0]._id}`)
      .set('x-auth', INIT_ADMIN.tokens[0])
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let picUrl = INIT_PROJECTS[0].pics[0].url;

        expect(fs.existsSync(RESOURCES_DIR + picUrl)).toBe(false);
        Project.findById(INIT_PROJECTS[0]._id).then(project => {
          expect(project.pics.length).toBe(INIT_PROJECTS[0].pics.length - 1);
          expect(project.pics).toExclude(INIT_PROJECTS[0].pics[0]);
          done();
        });
      });
  });
});
