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

module.exports = blogRouter;