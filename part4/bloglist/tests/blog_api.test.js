const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blogModel');
const { blogsInDb } = require('./test_helper');

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

describe('Post A Blog', () => {
  test('create and save a blog', async () => {
    const sampleBlog = {
      title:'How to draw a circle',
      author:'Eugine',
      url:'https://github.com/giaongo',
      likes:0
    };
    await api.post('/api/blogs').send(sampleBlog).expect(201);
    const getResponse = await api.get('/api/blogs');
    expect(getResponse.body).toHaveLength(initialBlogs.length + 1);
  });

  test('missing likes become zero', async () => {
    const sampleBlog = {
      title:'mising likes',
      author:'Helena',
      url:'https://github.com/giaongo',
    };
    const postResponse = await api.post('/api/blogs').send(sampleBlog).expect(201);
    expect(postResponse.body.likes).toBeDefined();
  });

  test('missing title throws error 400', async () => {
    const sampleBlog = {
      author:'giao',
      likes:4,
      url:'https://github.com/giaongo'
    };
    await api.post('/api/blogs').send(sampleBlog).expect(400);
  });
  test('missing url throws error 400', async() => {
    const sampleBlog = {
      title:'i am testing',
      author:'giao',
      likes:4,
    };
    await api.post('/api/blogs').send(sampleBlog).expect(400);
  });
});

describe('Delete A Blog', () => {
  test('delete a blog succeeds with 204', async() => {
    const blogs = await blogsInDb();
    const firstBlogsToDelete = blogs[0];
    await api.delete('/api/blogs/' + firstBlogsToDelete.id).expect(204);

    const allBlogsAfterDelete = await blogsInDb();
    expect(allBlogsAfterDelete).toHaveLength(initialBlogs.length - 1);

    const listOfTitlesAfterDelete = allBlogsAfterDelete.map(blog => blog.title);
    expect(listOfTitlesAfterDelete).not.toContain(firstBlogsToDelete.title);
  });
},10000);

afterAll(async() => {
  await mongoose.connection.close();
});