const request = require('supertest');
const expect = require('expect');
const app = require('../../server/server');
const fs = require('fs');
const TeamMember = require('../../server/models/teammember');

const {INIT_TEAM_MEMBERS, INIT_ADMIN, populateAll, populateTeamMembers}
  = require('../../server/seed/seedInfo');

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
  populateTeamMembers().then(() => done());
});

describe('Testing path PUT /api/teammember', () => {
  it('should add a new team member', done => {
    request(app)
      .put('/api/teammember')
      .set('x-auth', INIT_ADMIN.tokens[0])
      .field('name', 'Yasser Hussain')
      .field('info', 'Yasser Hussain is awesome person')
      .field('type', 'Technical')
      .attach('pic', constructFullPath(testFileName))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        TeamMember.find()
          .then(members => {
            expect(members.length).toBe(INIT_TEAM_MEMBERS.length + 1);
          })
          .then(() => {
            return TeamMember.findOne({
              name: 'Yasser Hussain',
              info: 'Yasser Hussain is awesome person'
            });
          })
          .then(member => {
            expect(member).toExist();
            expect(member.pic).toInclude(testFileName);
            expect(fs.existsSync(RESOURCES_DIR + member.pic)).toBe(true);
            const newMember = res.body;
            delete newMember._id;
            expect(newMember).toEqual({
              name: 'Yasser Hussain',
              info: 'Yasser Hussain is awesome person',
              pic: member.pic
            });
            done();
          })
          .catch(done);
      });
  });
});


describe('Testing path PATCH /api/teammember/:_id', () => {
  it('should update teammember without updating pic', done => {
    request(app)
      .patch(`/api/teammember/${INIT_TEAM_MEMBERS[0]._id}`)
      .set('x-auth', INIT_ADMIN.tokens[0])
      .field('name', 'Member 1 modified')
      .field('info', 'Roman Infantry 1 got modified')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        TeamMember.findById(INIT_TEAM_MEMBERS[0]._id)
          .then(member => {
            expect(member.name).toBe('Member 1 modified');
            expect(member.info).toBe('Roman Infantry 1 got modified');
            expect(member.pic).toBe(INIT_TEAM_MEMBERS[0].pic);
            expect(fs.existsSync(RESOURCES_DIR + member.pic)).toBe(true);
            const newMember = res.body;
            delete newMember._id;
            expect(newMember).toEqual({
              name: 'Member 1 modified',
              info: 'Roman Infantry 1 got modified',
              pic: INIT_TEAM_MEMBERS[0].pic
            });
            done();
          })
          .catch(done);
      });
  });

  it('should update teammember with pic', done => {
    request(app)
      .patch(`/api/teammember/${INIT_TEAM_MEMBERS[0]._id}`)
      .set('x-auth', INIT_ADMIN.tokens[0])
      .field('name', 'Member 1 modified')
      .field('info', 'Roman Infantry 1 got modified')
      .attach('pic', constructFullPath(testFileName))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        TeamMember.findById(INIT_TEAM_MEMBERS[0]._id)
          .then(member => {
            expect(member.name).toBe('Member 1 modified');
            expect(member.info).toBe('Roman Infantry 1 got modified');
            expect(member.pic).toNotBe(INIT_TEAM_MEMBERS[0].pic);
            expect(member.pic).toInclude(testFileName);
            const newMember = res.body;
            delete newMember._id;
            expect(newMember).toEqual({
              name: 'Member 1 modified',
              info: 'Roman Infantry 1 got modified',
              pic: member.pic
            });
            expect(fs.existsSync(RESOURCES_DIR + INIT_TEAM_MEMBERS[0].pic)).toBe(false);
            expect(fs.existsSync(RESOURCES_DIR + member.pic)).toBe(true);
            done();
          })
          .catch(done);
      });
  });
});
