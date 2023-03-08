const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blogModel');

const initialBlogs = [
  {
    title:'HTML is easy',
    author: 'Giao',
    url:'https://github.com/giaongo',
    likes:5
  },
  {
    title:'Be positive',
    author:'Eugine',
    url:'https://github.com/giaongo',
    likes:10
  }
];

beforeEach(async () => {
  try {
    await Blog.deleteMany({});
    const blogObjects = initialBlogs.map(blog => new Blog(blog));
    await Promise.all(blogObjects.map(async (blog) => await blog.save()));
  } catch (error) {
    console.error('errorInitialisingTestDatabase', error);
  }
});

describe('Get All Blogs', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs').expect(201)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async() => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length);
  },);

  test('returned unique identidier in right format', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });
});

afterAll(async() => {
  await mongoose.connection.close();
});