const Analytics = require('../models/Analytics');

// Track page views for a specific blog post
exports.trackPageView = async (req, res) => {
  try {
    const { postId } = req.params;
    const ipAddress = req.ip; // Capture the user's IP address

    // Save the analytics data to the database
    const analyticsData = new Analytics({
      blogPost: postId,
      ipAddress,
    });
    await analyticsData.save();

    return res.status(200).json({ message: 'Page view tracked successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
