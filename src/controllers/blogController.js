const BlogPost = require('../models/BlogPost');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up multer for handling image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads')); // Destination folder for storing image files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb('Error: Images only!');
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

// Create a new blog post with images
exports.createBlogPost = upload.array('images', 5), async (req, res) => {
  try {
    // Check if images were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Please upload at least one image' });
    }

    // Handle uploaded images
    const imagePaths = req.files.map((file) => file.path);

    const { title, content, category, scheduledPublishing, permalink, postStatus, visibility } = req.body;

    // Create a new blog post
    const blogPost = new BlogPost({
      title,
      content,
      category,
      scheduledPublishing,
      permalink,
      postStatus,
      visibility,
      author: req.user.userId,
      images: imagePaths,
    });

    await blogPost.save();

    return res.status(201).json({ message: 'Blog post created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a blog post with images
exports.updateBlogPost = upload.array('images', 5), async (req, res) => {
  try {
    // Check if images were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Please upload at least one image' });
    }

    // Handle uploaded images
    const imagePaths = req.files.map((file) => file.path);

    const { title, content, category, scheduledPublishing, permalink, postStatus, visibility } = req.body;
    const postId = req.params.postId;

    const blogPost = await BlogPost.findByIdAndUpdate(
      postId,
      {
        title,
        content,
        category,
        scheduledPublishing,
        permalink,
        postStatus,
        visibility,
        images: imagePaths,
      },
      { new: true }
    );

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Remove old image files if they were updated
    if (req.body.deletedImages && req.body.deletedImages.length > 0) {
      for (const imageToDelete of req.body.deletedImages) {
        const imagePath = path.join(__dirname, '..', 'uploads', imageToDelete);
        fs.unlinkSync(imagePath);
      }
    }

    return res.status(200).json({ message: 'Blog post updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all blog posts
exports.getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().populate('author', 'username');

    return res.status(200).json(blogPosts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a blog post
exports.deleteBlogPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const deletedPost = await BlogPost.findByIdAndRemove(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Remove associated images from the uploads folder
    if (deletedPost.images && deletedPost.images.length > 0) {
      for (const imageToDelete of deletedPost.images) {
        const imagePath = path.join(__dirname, '..', 'uploads', imageToDelete);
        fs.unlinkSync(imagePath);
      }
    }

    return res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a blog post by its ID
exports.getBlogPostById = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Find the blog post by its ID
    const blogPost = await BlogPost.findById(postId).populate('author', 'username');

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    return res.status(200).json(blogPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a specific blog post by ID
exports.updateBlogPost = async (req, res) => {
  const postId = req.params.postId;
  const { content, images, category } = req.body; 

  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      postId,
      {
        title,
        content,
        images,
        category,
        scheduledPublishing,
        permalink,
        postStatus,
        visibility,
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: 'Blog post update failed due to validation errors.' });
  }
};