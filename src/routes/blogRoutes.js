const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/posts', blogController.createBlogPost);
router.get('/posts', blogController.getAllBlogPosts);
router.get('/posts/:postId', blogController.getBlogPostById);
router.put('/posts/:postId', blogController.updateBlogPost);
router.delete('/posts/:postId', blogController.deleteBlogPost);

module.exports = router;
