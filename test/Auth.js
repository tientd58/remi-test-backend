process.env.NODE_ENV = 'test';

const chai = require('chai');
const { faker } = require('@faker-js/faker');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const db = require('../server/models');
const server = require('../app');

const { user: User, role: Role, refreshToken: RefreshToken } = db;
const expect = chai.expect;
chai.should();
chai.use(chaiHttp);

describe('Users', () => {
  describe('/POST signup user', () => {
    User.collection.drop();
    it('it should create a new user', (done) => {
      let user = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      chai
        .request(server)
        .post('/api/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res._body.should.be.a('object');
          done();
        });
    });
  });
});


// describe('Users', () => {
//   describe('/POST user signin', () => {
//     User.collection.drop();
//     it('it should signin user', (done) => {
//       let user = {
//         username: faker.internet.userName(),
//         password: faker.internet.password(),
//       };
//       chai
//         .request(server)
//         .post('/api/auth/signin')
//         .send(user)
//         .end((err, res) => {
//           console.log('res: ', res._body);
//           res.should.have.status(200);
//           res.should.be.json;
//           res._body.should.be.a('object');
//           done();
//         });
//     });
//   });
// });