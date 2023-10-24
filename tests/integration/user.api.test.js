const supertest = require('supertest');
const chai = require('chai');
const app = require('../app'); // Import your Express app
const expect = chai.expect;

describe('User API Tests', () => {
  let token; // Store the authentication token

  // Run this before tests to authenticate and get the token
  before((done) => {
    supertest(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com', // Replace with an existing user's email
        password: 'testpassword', // Replace with the user's password
      })
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        done();
      });
  });

  it('should retrieve user profile', (done) => {
    supertest(app)
      .get('/users/:userId') // Replace :userId with an existing user's ID
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('username');
        expect(res.body).to.have.property('email');
        done();
      });
  });

  it('should update user information', (done) => {
    const updatedUserData = {
      username: 'newUsername',
      email: 'newemail@example.com',
    };

    supertest(app)
      .put('/users/update')
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUserData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'User updated successfully');
        done();
      });
  });

  it('should handle invalid user information updates', (done) => {
    // Test invalid user information updates
    // ...

    supertest(app)
      .put('/users/update')
      .set('Authorization', `Bearer ${token}`)
      .send({
        // Invalid user information here
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
