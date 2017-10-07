const fs = require('fs');
const request = require('supertest');
const app = require('../../server/server');
const {INIT_ADMIN, populateAll, populateAboutUs} = require('../../server/seed/seedInfo');

const {RESOURCES_DIR} = process.env;

before(done => {
  if (!fs.existsSync(RESOURCES_DIR)) {
    fs.mkdirSync(RESOURCES_DIR);
  }
  populateAll().then(() => done());
});

beforeEach(done => {
  populateAboutUs().then(() => done());
});

describe('Testing path PATCH /api/about-us/vision', () => {
  it('should not update vision because of minlength', done => {
    request(app)
      .patch('/api/about-us/vision')
      .set('x-auth', INIT_ADMIN.tokens[0])
      .send({vision: 'Yasser Hussain'})
      .expect(400)
      .end(done);
  });

  const bigString = `Fusce commodo porta molestie. Vestibulum ac tellus condimentum, auctor felis sed,
  pharetra eros. Sed placerat eget elit ut feugiat. Pellentesque nec dictum lorem.
  Morbi luctus dignissim arcu et venenatis. Fusce ac fringilla lorem.
  Morbi pharetra at ex in sollicitudin. Donec commodo, nulla et mollis finibus, mauris dolor eleifend nisl,
  eget cursus arcu leo id risus. mauris dolor eleifend nisl, eget cursus arcu leo id risus.`;

  it('should update vision', done => {
    request(app)
      .patch('/api/about-us/vision')
      .set('x-auth', INIT_ADMIN.tokens[0])
      .send({vision: bigString})
      .expect(200)
      .end(done);
  });
});

describe('Testing path PATCH /api/about-us/mission', () => {
  it('should not update mission because of minlength', done => {
    request(app)
      .patch('/api/about-us/mission')
      .set('x-auth', INIT_ADMIN.tokens[0])
      .send({mission: 'Yasser Hussain'})
      .expect(400)
      .end(done);
  });

  const bigString = `Fusce commodo porta molestie. Vestibulum ac tellus condimentum, auctor felis sed,
  pharetra eros. Sed placerat eget elit ut feugiat. Pellentesque nec dictum lorem.
  Morbi luctus dignissim arcu et venenatis. Fusce ac fringilla lorem.
  Morbi pharetra at ex in sollicitudin. Donec commodo, nulla et mollis finibus, mauris dolor eleifend nisl,
  eget cursus arcu leo id risus. mauris dolor eleifend nisl, eget cursus arcu leo id risus.`;

  it('should update mission', done => {
    request(app)
      .patch('/api/about-us/mission')
      .set('x-auth', INIT_ADMIN.tokens[0])
      .send({mission: bigString})
      .expect(200)
      .end(done);
  });
});

describe('Testing path PATCH /api/about-us/history', () => {
  it('should not update history because of minlength', done => {
    request(app)
      .patch('/api/about-us/history')
      .set('x-auth', INIT_ADMIN.tokens[0])
      .send({history: 'Yasser Hussain'})
      .expect(400)
      .end(done);
  });

  const bigString = `Fusce commodo porta molestie. Vestibulum ac tellus condimentum, auctor felis sed,
  pharetra eros. Sed placerat eget elit ut feugiat. Pellentesque nec dictum lorem.
  Morbi luctus dignissim arcu et venenatis. Fusce ac fringilla lorem.
  Morbi pharetra at ex in sollicitudin. Donec commodo, nulla et mollis finibus, mauris dolor eleifend nisl,
  eget cursus arcu leo id risus. mauris dolor eleifend nisl, eget cursus arcu leo id risus.`;

  it('should update vision and mission', done => {
    request(app)
      .patch('/api/about-us/history')
      .set('x-auth', INIT_ADMIN.tokens[0])
      .send({history: bigString})
      .expect(200)
      .end(done);
  });
});

