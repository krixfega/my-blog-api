const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const BlogPostController = require('../controllers/blogPostController'); // Import blog post controller
const BlogPost = require('../models/BlogPost'); // Import BlogPost model

describe('Blog Post Unit Tests', () => {
  // Test blog post creation
  describe('Blog Post Creation', () => {
    it('should create a new blog post', async () => {
      const postData = {
        title: 'Test Post',
        content: 'This is a test post content.',
      };

      // Stub the BlogPost model's create method to avoid database interactions
      const createStub = sinon.stub(BlogPost, 'create').returns(postData);

      const newPost = await BlogPostController.createBlogPost(postData);

      expect(newPost).to.have.property('title', postData.title);
      expect(newPost).to.have.property('content', postData.content);
      expect(createStub.calledOnce).to.be.true;

      createStub.restore();
    });
  });

  // Test blog post retrieval
  describe('Blog Post Retrieval', () => {
    it('should retrieve a specific blog post', async () => {
      // Create a sample blog post in the database

      // Fetch the blog post by its ID
      const postId = 'sample-post-id';

      // Stub the BlogPost model's findById method to simulate database retrieval
      const findByIdStub = sinon.stub(BlogPost, 'findById').returns(/* The blog post data */);

      const retrievedPost = await BlogPostController.getBlogPost(postId);

      expect(retrievedPost).to.be.an('object');
      expect(findByIdStub.calledOnce).to.be.true;

      findByIdStub.restore();
    });

    it('should retrieve all blog posts', async () => {
      // Create multiple sample blog posts in the database

      // Stub the BlogPost model's find method to simulate database retrieval
      const findStub = sinon.stub(BlogPost, 'find').returns(/* An array of blog post data */);

      const allPosts = await BlogPostController.getAllBlogPosts();

      expect(allPosts).to.be.an('array');
      expect(findStub.calledOnce).to.be.true;

      findStub.restore();
    });
  });

  // Test blog post updates
  describe('Blog Post Updates', () => {
    it('should update a specific blog post', async () => {
      const postId = 'sample-post-id';

      const updatedData = {
        title: 'Updated Test Post',
        content: 'This is an updated test post content.',
      };

      // Stub the BlogPost model's findByIdAndUpdate method to simulate update
      const findByIdAndUpdateStub = sinon.stub(BlogPost, 'findByIdAndUpdate').returns(updatedData);

      const updatedPost = await BlogPostController.updateBlogPost(postId, updatedData);

      expect(updatedPost).to.have.property('title', updatedData.title);
      expect(updatedPost).to.have.property('content', updatedData.content);
      expect(findByIdAndUpdateStub.calledOnce).to.be.true;

      findByIdAndUpdateStub.restore();
    });
  });

  // Test blog post deletion
  describe('Blog Post Deletion', () => {
    it('should delete a specific blog post', async () => {
      const postId = 'sample-post-id';

      // Stub the BlogPost model's findByIdAndDelete method to simulate deletion
      const findByIdAndDeleteStub = sinon.stub(BlogPost, 'findByIdAndDelete').returns(/* Deletion success status */);

      const result = await BlogPostController.deleteBlogPost(postId);

      expect(result).to.be.true;
      expect(findByIdAndDeleteStub.calledOnce).to.be.true;

      findByIdAndDeleteStub.restore();
    });
  });
});
