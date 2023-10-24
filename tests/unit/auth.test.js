const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const AuthController = require('../controllers/authController'); // Import your authentication controller
const User = require('../models/User'); // Import your User model

describe('Authentication Unit Tests', () => {
  // Test user registration
  describe('User Registration', () => {
    it('should create a new user and return a token', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
      };

      // Stub the User model's create method to avoid database interactions
      const createStub = sinon.stub(User, 'create').returns(userData);

      const token = await AuthController.register(userData);

      expect(token).to.be.a('string');
      expect(createStub.calledOnce).to.be.true;

      createStub.restore();
    });
  });
  it('should handle invalid registration data', async () => {
    const invalidUserData = {
      // Invalid data here
    };
  
    try {
      await AuthController.register(invalidUserData);
      expect.fail('Registration should fail with invalid data');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.include('validation error message');
    }
  });

  it('should handle duplicate registration', async () => {
    const existingUserData = {
      username: 'existinguser',
      email: 'existing@example.com',
      password: 'existingpassword',
    };
  
    // Create a user with existingUserData in the database before the test
  
    const duplicateUserData = {
      username: 'existinguser',
      email: 'existing@example.com',
      password: 'testpassword',
    };
  
    try {
      await AuthController.register(duplicateUserData);
      expect.fail('Registration should fail with duplicate data');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.include('duplicate key error message');
    }
  });
  
  

  // Test user login
  describe('User Login', () => {
    it('should authenticate and return a token', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'testpassword',
      };

      // Stub the User model's findOne method to avoid database interactions
      const findOneStub = sinon.stub(User, 'findOne').returns(userData);

      // Stub the jwt.sign method to return a token
      const signStub = sinon.stub(jwt, 'sign').returns('testtoken');

      const token = await AuthController.login(userData);

      expect(token).to.equal('testtoken');
      expect(findOneStub.calledOnce).to.be.true;
      expect(signStub.calledOnce).to.be.true;

      findOneStub.restore();
      signStub.restore();
    });
  });

  it('should handle invalid login credentials', async () => {
    const invalidLoginData = {
      email: 'nonexistent@example.com',
      password: 'wrongpassword',
    };
  
    try {
      await AuthController.login(invalidLoginData);
      expect.fail('Login should fail with invalid credentials');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.include('Invalid credentials');
    }
  });

  // Test token verification
  describe('Token Verification', () => {
    it('should verify a valid token', () => {
      const validToken = 'valid-token';
      const secretKey = 'your-secret-key';

      // Stub jwt.verify to simulate token verification
      const verifyStub = sinon.stub(jwt, 'verify').callsFake((token, secret, callback) => {
        if (token === validToken && secret === secretKey) {
          callback(null, { userId: 'user-id' });
        } else {
          callback(new Error('Invalid token'));
        }
      });

      const result = AuthController.verifyToken(validToken, secretKey);

      expect(result).to.be.an('object');
      expect(result).to.have.property('userId', 'user-id');
      expect(verifyStub.calledOnce).to.be.true;

      verifyStub.restore();
    });

    it('should handle invalid tokens', () => {
      const invalidToken = 'invalid-token';
      const secretKey = 'your-secret-key';

      // Stub jwt.verify to simulate token verification
      const verifyStub = sinon.stub(jwt, 'verify').callsFake((token, secret, callback) => {
        if (token === invalidToken && secret === secretKey) {
          callback(new Error('Invalid token'));
        } else {
          callback(new Error('Other error'));
        }
      });

      try {
        AuthController.verifyToken(invalidToken, secretKey);
        expect.fail('Token verification should throw an error');
      } catch (error) {
        expect(error).to.be.an('error');
        expect(error.message).to.equal('Invalid token');
      }

      verifyStub.restore();
    });
  });
});
