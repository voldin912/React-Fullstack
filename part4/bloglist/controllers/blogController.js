const blogRouter = require('express').Router();
const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('express-async-errors');


blogRouter.get('/', async (request,response) => {
  const blogs = await Blog.find({}).populate('user', { username:1, name:1 });
  response.status(201).json(blogs);
});

blogRouter.post('/', async (request,response) => {
  const blogToAdd = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if(!decodedToken) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);

  if(!blogToAdd.title || !blogToAdd.url) {
    return response.status(400).end();
  }
  blogToAdd.likes = blogToAdd.likes || 0 ;
  const updatedUserInfoBlog = { ...request.body,user: user._id };

  const blog = new Blog(updatedUserInfoBlog);
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.status(201).json(result);
});

blogRouter.delete('/:id', async(request, response) => {
  const blogIdToDelete = request.params.id;
  await Blog.findByIdAndRemove(blogIdToDelete);
  response.status(204).end();
});

blogRouter.put('/:id', async(request, response) => {
  const blogIdToUpdate = request.params.id;
  const likesNumber = {
    likes: request.body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(blogIdToUpdate, likesNumber, { new:true });
  response.status(204).json(updatedBlog);
});
module.exports = blogRouter;