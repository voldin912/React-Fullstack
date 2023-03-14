const User = require('../models/userModel');
const logger = require('./logger');
const jwt = require('jsonwebtoken');
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'Token expired' });
  } else if (error.name === 'TypeError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if(authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};
const tokenExtractor = (request) => {
  return getTokenFrom(request);
};

const userExtractor = async (request, response, next) => {
  const token = tokenExtractor(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  console.log('token availability', decodedToken);
  if(!decodedToken) {
    return response.status(401).json({ error:'token invalid' });
  }
  try {
    request.user = await User.findById(decodedToken.id);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor
};