const blogRouter = require('express').Router();
const Blog = require('../models/blogModel');

blogRouter.get('/',(request,response, next) => {

  Blog
    .find({})
    .then((blogs) => {
      response.json(blogs);
    })
    .catch(err => next(err));
});

blogRouter.post('/',(request,response, next) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch(err => next(err));
});

module.exports = blogRouter;