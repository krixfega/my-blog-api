const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

/**
 * @openapi
 * /posts:
 *   post:
 *     summary: Create a new blog post
 *     description: Create a new blog post with images.
 *     responses:
 *       201:
 *         description: Blog post created successfully.
 *       400:
 *         description: Blog post creation failed due to validation errors.
 *       401:
 *         description: Unauthorized - User must be authenticated.
 */
router.post('/posts', blogController.createBlogPost);

/**
 * @openapi
 * /posts:
 *   get:
 *     summary: Get all blog posts
 *     description: Retrieve a list of all blog posts.
 *     responses:
 *       200:
 *         description: A list of blog posts.
 *       401:
 *         description: Unauthorized - User must be authenticated to access this endpoint.
 */
router.get('/posts', blogController.getAllBlogPosts);

/**
 * @openapi
 * /posts/{postId}:
 *   get:
 *     summary: Get a specific blog post by ID
 *     description: Retrieve a specific blog post by its unique ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the blog post to retrieve.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the blog post.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of image URLs.
 *               category:
 *                 type: string
 *                 description: The category of the blog post.
 *     responses:
 *       200:
 *         description: Blog post retrieved successfully.
 *       404:
 *         description: Blog post not found.
 *       401:
 *         description: Unauthorized - User must be authenticated.
 */
router.get('/posts/:postId', blogController.getBlogPostById);

/**
 * @openapi
 * /posts/{postId}:
 *   put:
 *     summary: Update a specific blog post by ID
 *     description: Update the content and images of a specific blog post by its unique ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the blog post to update.
 *     responses:
 *       200:
 *         description: Blog post updated successfully.
 *       404:
 *         description: Blog post not found.
 *       400:
 *         description: Blog post update failed due to validation errors.
 *       401:
 *         description: Unauthorized - User must be authenticated.
 */
router.put('/posts/:postId', blogController.updateBlogPost);

/**
 * @openapi
 * /posts/{postId}:
 *   delete:
 *     summary: Delete a specific blog post by ID
 *     description: Delete a specific blog post by its unique ID.
 *     parameters:
 *       - in: path
 *         name: postId
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
 *         description: Unauthorized - User must be authenticated.
 */
router.delete('/posts/:postId', blogController.deleteBlogPost);

module.exports = router;
