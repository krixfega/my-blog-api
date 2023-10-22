const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Track a page view for a specific blog post
router.post('/analytics/track/:postId', analyticsController.trackPageView);

module.exports = router;
