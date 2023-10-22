const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Protected route that requires authentication
router.get('/profile', authMiddleware.verifyToken, userController.profile);

// Other user routes
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
