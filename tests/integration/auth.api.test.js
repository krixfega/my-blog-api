const supertest = require('supertest');
const chai = require('chai');
const app = require('../app'); // Import your Express app
const expect = chai.expect;

describe('Authentication API Tests', () => {
  it('should register a new user', (done) => {
    supertest(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should handle invalid registration data', (done) => {
    supertest(app)
      .post('/auth/register')
      .send({
        // Invalid registration data here
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should log in an existing user', (done) => {
    supertest(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'testpassword',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should handle invalid login credentials', (done) => {
    supertest(app)
      .post('/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword',
      })
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
