const Blog = require('../models/blogModel');
const User = require('../models/userModel');

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
const usersInDb = async () => {
  try {
    const users = await User.find({});
    return users.map(user => user.toJSON());
  } catch (error) {
    console.error('errorGettingUsers', error);
  }
};
module.exports = { blogsInDb, blogById, usersInDb };
