const supertest = require('supertest');
const chai = require('chai');
const app = require('../app'); // Import your Express app
const expect = chai.expect;

describe('Blog Post API Tests', () => {
  let token; // Store the authentication token
  let postId; // Store the ID of a blog post (for update and delete tests)

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

  it('should retrieve all blog posts', (done) => {
    supertest(app)
      .get('/blog/posts')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should create a new blog post', (done) => {
    const postData = {
      title: 'Test Post',
      content: 'This is a test post content.',
    };

    supertest(app)
      .post('/blog/posts')
      .set('Authorization', `Bearer ${token}`)
      .send(postData)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        postId = res.body._id; // Store the ID for future tests
        done();
      });
  });

  it('should update a blog post', (done) => {
    const updatedData = {
      title: 'Updated Test Post',
      content: 'This is an updated test post content.',
    };

    supertest(app)
      .put(`/blog/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedData)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('title', updatedData.title);
        done();
      });
  });

  it('should delete a blog post', (done) => {
    supertest(app)
      .delete(`/blog/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'Blog post deleted successfully');
        done();
      });
  });
});
