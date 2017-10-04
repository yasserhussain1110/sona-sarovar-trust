const request = require('supertest');
const expect = require('expect');
const app = require('../../server/server');
const fs = require('fs');
const Project = require('../../server/models/project');
const {
  INIT_PROJECTS, INIT_ADMIN,
  populateAdmins, populateHomePage, populateTeamMembers, populateProjects
} = require('../../server/seed/seedInfo');
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

describe('Testing schema Project', () => {
  it('should not create a new project with empty name & description', done => {
    new Project({
      name: '',
      description: ''
    }).save()
      .then(() => done('Project Created'))
      .catch(() => done());
  });

  it('should not create a new project with empty pics field', done => {
    new Project({
      name: 'rome',
      description: 'victory'
    }).save()
      .then(() => done('Project Created'))
      .catch(() => done());
  });

  it('should not create a new project with incorrect pic type', done => {
    new Project({
      name: 'rome',
      description: 'victory',
      pics: 'something'
    }).save()
      .then(() => done('Project Created'))
      .catch(() => done());
  });

  it('should not create a new project with empty array', done => {
    new Project({
      name: 'rome',
      description: 'victory',
      pics: []
    }).save()
      .then(() => done('Project Created'))
      .catch(() => done());
  });

  it('should not create a new project with object not containing url field', done => {
    new Project({
      name: 'rome',
      description: 'victory',
      pics: [{some: 'prop'}]
    }).save()
      .then(() => done('Project Created'))
      .catch(() => done());
  });

  it('should create a new project with pics field and \'pics.0.url\' field', done => {
    new Project({
      name: 'rome',
      description: 'victory',
      pics: [{url: '/awesome/url'}]
    }).save()
      .then(p => {
        expect(p.name).toBe('rome');
        expect(p.description).toBe('victory');
        expect(p.pics.map(pic => {
          const jsonPic = pic.toJSON();
          delete jsonPic._id;
          return jsonPic;
        })).toEqual([{url: '/awesome/url'}]);
        done();
      })
      .catch(e => done(e));
  });
});


describe('Testing path DELETE /project/:_id', () => {
  it('should delete a whole project', done => {
    request(app)
      .delete(`/api/project/${INIT_PROJECTS[0]._id}`)
      .set('x-auth', INIT_ADMIN.tokens[0])
      .send()
      .expect(200)
      .end(err => {
        if (err) return done(err);
        const pics = INIT_PROJECTS[0].pics;
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
  it('should delete a pic of a project', done => {
    request(app)
      .delete(`/api/project/pic/${INIT_PROJECTS[0].pics[0]._id}`)
      .set('x-auth', INIT_ADMIN.tokens[0])
      .send()
      .expect(200)
      .end(err => {
        if (err) return done(err);
        const picUrl = INIT_PROJECTS[0].pics[0].url;

        expect(fs.existsSync(RESOURCES_DIR + picUrl)).toBe(false);
        Project.findById(INIT_PROJECTS[0]._id).then(project => {
          expect(project.pics.length).toBe(INIT_PROJECTS[0].pics.length - 1);
          expect(project.pics.map(pic => pic.toJSON())).toExclude(INIT_PROJECTS[0].pics[0]);
          done();
        }).catch(e => done(e));
      });
  });
});
