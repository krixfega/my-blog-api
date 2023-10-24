const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

/**
 * @openapi
 * /analytics/track/{postId}:
 *   post:
 *     summary: Track a page view for a specific blog post
 *     description: Track a page view for a specific blog post using its unique ID.
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the blog post to track the page view for.
 *     responses:
 *       200:
 *         description: Page view tracked successfully.
 *       404:
 *         description: Blog post not found.
 *       401:
 *         description: Unauthorized - User must be authenticated.
 */
router.post('/analytics/track/:postId', analyticsController.trackPageView);

module.exports = router;
