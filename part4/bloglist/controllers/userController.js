const userRouter = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({ username, name, hashedPassword });
  const result = await newUser.save();
  response.status(201).json(result);
});

module.exports = userRouter;