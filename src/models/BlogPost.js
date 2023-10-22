const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  images: [{ type: String }], // Array of image file paths or URLs
  createdAt: { type: Date, default: Date.now },
  // Additional fields as needed
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
