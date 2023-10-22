const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

// Create a new blog post (only admins can access)
router.post('/blogposts', authMiddleware.verifyToken, authMiddleware.checkRole('admin'), adminController.createBlogPost);

// Update an existing blog post (only admins can access)
router.put('/blogposts/:id', authMiddleware.verifyToken, authMiddleware.checkRole('admin'), adminController.updateBlogPost);

// Delete a blog post (only admins can access)
router.delete('/blogposts/:id', authMiddleware.verifyToken, authMiddleware.checkRole('admin'), adminController.deleteBlogPost);

// Get a list of all users (only admins can access)
router.get('/users', authMiddleware.verifyToken, authMiddleware.checkRole('admin'), adminController.getAllUsers);

// Update site settings (only admins can access)
router.put('/site-settings', authMiddleware.verifyToken, authMiddleware.checkRole('admin'), adminController.updateSiteSettings);

// Get site settings (public access)
router.get('/site-settings', adminController.getSiteSettings);

module.exports = router;
