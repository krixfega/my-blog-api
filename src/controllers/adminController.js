const BlogPost = require('../models/BlogPost');
const User = require('../models/User');
const Admin = require('../models/Admin');

// Create a new blog post
exports.createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const blogPost = new BlogPost({ title, content });
    await blogPost.save();

    return res.status(201).json(blogPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an existing blog post
exports.updateBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const postId = req.params.id;

    const blogPost = await BlogPost.findByIdAndUpdate(postId, { title, content }, { new: true });

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    return res.status(200).json(blogPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a blog post
exports.deleteBlogPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const blogPost = await BlogPost.findByIdAndRemove(postId);

    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a list of all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Create or update site settings
exports.updateSiteSettings = async (req, res) => {
    try {
      const {
        title,
        description,
        logoUrl,
        primaryColor,
        secondaryColor,
        contactEmail,
        contactPhone,
        // Add more fields here
      } = req.body;
  
      // Check if site settings already exist, and update or create accordingly
      let siteSettings = await SiteSettings.findOne();
  
      if (!siteSettings) {
        siteSettings = new SiteSettings({
          title,
          description,
          logoUrl,
          primaryColor,
          secondaryColor,
          contactEmail,
          contactPhone,
          // Add more fields here
        });
      } else {
        siteSettings.title = title;
        siteSettings.description = description;
        siteSettings.logoUrl = logoUrl;
        siteSettings.primaryColor = primaryColor;
        siteSettings.secondaryColor = secondaryColor;
        siteSettings.contactEmail = contactEmail;
        siteSettings.contactPhone = contactPhone;
        // Update more fields here
      }
  
      await siteSettings.save();
  
      return res.status(200).json(siteSettings);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Retrieve site settings
  exports.getSiteSettings = async (req, res) => {
    try {
      const siteSettings = await SiteSettings.findOne();
  
      if (!siteSettings) {
        return res.status(404).json({ message: 'Site settings not found' });
      }
  
      return res.status(200).json(siteSettings);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };