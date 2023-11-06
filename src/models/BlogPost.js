const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true,},
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  images: [{ type: String }], 
  createdAt: { type: Date, default: Date.now },
  scheduledPublishing: { type: Date, }, // Date when the blog post should be published
  permalink: { type: String, unique: true, },
  postStatus: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft', }, // Status of the blog post
  visibility: { type: String, enum: ['public', 'private'], default: 'public', }, // Visibility of the blog post 
  
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
