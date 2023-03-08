const blogRouter = require('express').Router();
const Blog = require('../models/blogModel');

blogRouter.get('/', async (request,response) => {
  const blogs = await Blog.find({});
  response.status(201).json(blogs);
});

blogRouter.post('/', async (request,response) => {
  const blogToAdd = request.body;
  if(!blogToAdd.title || !blogToAdd.url) {
    return response.status(400).end();
  }
  blogToAdd.likes = blogToAdd.likes || 0 ;
  const blog = new Blog(request.body);
  const result = await blog.save();
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