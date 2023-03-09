const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { usersInDb } = require('./test_helper');
const api = supertest(app);

beforeEach(async() => {
  try {
    await User.deleteMany({});
    const hashedPasword = await bcrypt.hash('roottest', 10);
    const user = new User({
      username: 'root',
      name:'rootForTest',
      hashedPassword: hashedPasword

    });
    await user.save();
  } catch (error) {
    console.log('errorInitialisingTestDatabase', error);
  }
});

describe('Post A User', () => {
  test('create and save a user', async () => {
    const sampleUser = {
      username:'Giao',
      name:'Giao Ngo',
      password:'test123'
    };
    const userListBeforeTest = await usersInDb();
    await api.post('/api/users').send(sampleUser)
      .expect(201).expect('Content-Type', /application\/json/);
    const userListAfterTest = await usersInDb();
    expect(userListAfterTest).toHaveLength(userListBeforeTest.length + 1);
    expect(userListAfterTest[userListAfterTest.length - 1].username).toBe(sampleUser.username);
  });

  test('invalid user is not added', async() => {
    const sampleUser = {
      username:'edTi',
      name:'Tina',
    };
    const userListBeforeTest = await usersInDb();
    await api.post('/api/users').send(sampleUser).expect(400);
    const userListAfterTest = await usersInDb();
    expect(userListAfterTest).toHaveLength(userListBeforeTest.length);
  });

  test('not unique username throws 400', async() => {
    const sampleUser = {
      username: 'root',
      name:'root',
      password:'tedst1232'
    };
    await api.post('/api/users').send(sampleUser).expect(400);
  });

});

afterAll(async() => {
  await mongoose.connection.close();
});