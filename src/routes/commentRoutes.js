const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const commentController = require('../controllers/commentController');

/**
 * @openapi
 * /comments:
 *   post:
 *     summary: Create a comment
 *     description: Create a new comment for a blog post.
 *     responses:
 *       201:
 *         description: Comment created successfully.
 *       400:
 *         description: Comment creation failed due to validation errors.
 *       401:
 *         description: Unauthorized - User must be authenticated.
 */
router.post('/comments', authMiddleware.verifyToken, commentController.createComment);

/**
 * @openapi
 * /comments/user:
 *   get:
 *     summary: Retrieve user's comments
 *     description: Retrieve a list of comments created by the authenticated user.
 *     responses:
 *       200:
 *         description: List of user's comments retrieved successfully.
 *       401:
 *         description: Unauthorized - User must be authenticated.
 */
router.get('/comments/user', authMiddleware.verifyToken, commentController.getUserComments);

module.exports = router;
