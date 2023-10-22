const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const commentController = require('../controllers/commentController');

// Create a comment
router.post('/comments', authMiddleware.verifyToken, commentController.createComment);

// Retrieve user's comments for their profile
router.get('/comments/user', authMiddleware.verifyToken, commentController.getUserComments);

module.exports = router;
