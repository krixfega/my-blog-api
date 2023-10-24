const chai = require('chai');
const expect = chai.expect;
const User = require('../models/User'); // Import User model
const UserController = require('../controllers/userController'); // Import user controller

describe('User Unit Tests', () => {
  // Test user registration
  describe('User Registration', () => {
    it('should create a new user', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      };

      const user = await UserController.registerUser(userData);

      expect(user).to.have.property('username', userData.username);
      expect(user).to.have.property('email', userData.email);
    });
  });

  // Test user login
  describe('User Login', () => {
    it('should authenticate and return a token', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'testpassword',
      };

      const token = await UserController.loginUser(userData);

      expect(token).to.be.a('string');
      // Add more assertions based on your actual login implementation
    });
  });

  // Test user validation
  describe('User Validation', () => {
    it('should validate a user with valid data', () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      };

      const validation = User.validateUser(userData);

      expect(validation).to.be.true;
    });

    it('should fail validation with missing data', () => {
      const userData = {
        email: 'test@example.com',
      };

      const validation = User.validateUser(userData);

      expect(validation).to.be.false;
    });
  });
});
