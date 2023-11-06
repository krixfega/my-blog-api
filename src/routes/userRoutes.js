const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');


/**
 * @openapi
 * /profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the user's profile information.
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#models/User' 
 */


// Protected route that requires authentication
router.get('/profile', authMiddleware.verifyToken, userController.profile);

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided details.
 *     responses:
 *       201:
 *         description: User registration successful.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#models/User' 
 *       400:
 *         description: Invalid request data or validation errors.
 *       409:
 *         description: User already exists. Conflict.
 */

router.post('/register', userController.register);


/**
 * @openapi
 * /login:
 *   post:
 *     summary: Log in an existing user
 *     description: Log in an existing user with valid credentials.
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#models/User'
 *       401:
 *         description: Authentication failure.
 */

router.post('/login', userController.login);

module.exports = router;
