const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @openapi
 * /admin/blogposts:
 *   post:
 *     summary: Create a new blog post (Admin)
 *     description: Create a new blog post. This endpoint is restricted to admin users.
 *     responses:
 *       201:
 *         description: Blog post created successfully.
 *       401:
 *         description: Unauthorized - Only admin users can access this endpoint.
 */
router.post('/admin/blogposts', authMiddleware.verifyToken, authMiddleware.checkRole('admin'), adminController.createBlogPost);

/**
 * @openapi
 * /admin/blogposts/{id}:
 *   put:
 *     summary: Update an existing blog post (Admin)
 *     description: Update an existing blog post. This endpoint is restricted to admin users.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the blog post to update.
 *     responses:
 *       200:
 *         description: Blog post updated successfully.
 *       404:
 *         description: Blog post not found.
 *       401:
 *         description: Unauthorized - Only admin users can access this endpoint.
 */
router.put('/admin/blogposts/:id', authMiddleware.verifyToken, authMiddleware.checkRole('admin'), adminController.updateBlogPost);

/**
 * @openapi
 * /admin/blogposts/{id}:
 *   delete:
 *     summary: Delete a blog post (Admin)
 *     description: Delete a blog post. This endpoint is restricted to admin users.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the blog post to delete.
 *     responses:
 *       200:
 *         description: Blog post deleted successfully.
 *       404:
 *         description: Blog post not found.
 *       401:
 *         description: Unauthorized - Only admin users can access this endpoint.
 */
router.delete('/admin/blogposts/:id', authMiddleware.verifyToken, authMiddleware.checkRole('admin'), adminController.deleteBlogPost);

/**
 * @openapi
 * /admin/users:
 *   get:
 *     summary: Get a list of all users (Admin)
 *     description: Retrieve a list of all users. This endpoint is restricted to admin users.
 *     responses:
 *       200:
 *         description: A list of all users.
 *       401:
 *         description: Unauthorized - Only admin users can access this endpoint.
 */
router.get('/admin/users', authMiddleware.verifyToken, authMiddleware.checkRole('admin'), adminController.getAllUsers);

/**
 * @openapi
 * /admin/site-settings:
 *   put:
 *     summary: Update site settings (Admin)
 *     description: Update site settings. This endpoint is restricted to admin users.
 *     responses:
 *       200:
 *         description: Site settings updated successfully.
 *       401:
 *         description: Unauthorized - Only admin users can access this endpoint.
 */
router.put('/admin/site-settings', authMiddleware.verifyToken, authMiddleware.checkRole('admin'), adminController.updateSiteSettings);

/**
 * @openapi
 * /admin/site-settings:
 *   get:
 *     summary: Get site settings (Public)
 *     description: Retrieve site settings. This endpoint is accessible to the public.
 *     responses:
 *       200:
 *         description: Site settings retrieved successfully.
 */
router.get('/admin/site-settings', adminController.getSiteSettings);

module.exports = router;
