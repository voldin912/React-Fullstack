const blogRouter = require('express').Router();
const Blog = require('../models/blogModel');
const User = require('../models/userModel');

blogRouter.get('/', async (request,response) => {
  const blogs = await Blog.find({}).populate('user', { username:1, name:1 });
  response.status(201).json(blogs);
});

blogRouter.post('/', async (request,response) => {
  const blogToAdd = request.body;
  if(!blogToAdd.title || !blogToAdd.url) {
    return response.status(400).end();
  }
  blogToAdd.likes = blogToAdd.likes || 0 ;
  const user = await User.find({});
  const updatedUserInfoBlog = { ...request.body,user: user[0]._id };
  const blog = new Blog(updatedUserInfoBlog);
  const result = await blog.save();
  user[0].blogs = user[0].blogs.concat(result._id);
  await user[0].save();
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