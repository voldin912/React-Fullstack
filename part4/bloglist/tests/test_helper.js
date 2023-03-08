const Blog = require('../models/blogModel');

const blogsInDb = async () => {
  try {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
  } catch(error) {
    console.error('errorGettingBlogsForTest', error);
  }
};
const blogById = async (id) => {
  try {
    const blogById = await Blog.findById(id);
    return blogById.toJSON();
  } catch (error) {
    console.error('errorGettingBlogById', error);
  }
};
module.exports = { blogsInDb, blogById };
