const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }, // Created timestamp
  updatedAt: { type: Date }, // Updated timestamp
});

// Middleware to update the updatedAt field before saving
commentSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
