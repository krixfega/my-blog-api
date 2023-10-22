const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  blogPost: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // For logged-in user tracking
  ipAddress: { type: String, required: true },
  userAgent: String, // User-agent string for device info
  timestamp: { type: Date, default: Date.now },
  
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;
