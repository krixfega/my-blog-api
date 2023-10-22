const Comment = require('../models/Comment');

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const userId = req.user.userId; // Assuming you've set the user ID in the JWT token.

    // Create the comment
    const comment = new Comment({ author: userId, post: postId, content });
    await comment.save();

    return res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// Retrieve comments for a user's profile
exports.getUserComments = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Retrieve comments by the user
    const userComments = await Comment.find({ author: userId }).populate('post');
    return res.status(200).json(userComments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
