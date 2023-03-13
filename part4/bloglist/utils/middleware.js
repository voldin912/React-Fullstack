const logger = require('./logger');

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

const errorHandler = (error, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'Token expired' });
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
const tokenExtractor = (request, response, next) => {
  request.token = getTokenFrom(request);
  console.log('token is',request.token);
  next();
};


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor
};