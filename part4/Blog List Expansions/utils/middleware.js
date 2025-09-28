const logger = require('./logger');
const jwt = require('jsonwebtoken');

const requestLogger = (req, res, next) => {
    if (process.env.NODE_ENV !== 'test') {
        logger.info('Method:', req.method);
        logger.info('Path:', req.path);
        logger.info('Body:', req.body);
        logger.info('---');
    }
    next();
}

const unknownEndpoint = (req, res) => {
    res.status(400).send({ error: 'unknown Endpoint' });
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message });
    }

    next(error);
}

const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization');
    if (auth && auth.startsWith('Bearer ')) {
        req.token = auth.replace('Bearer ', '');
    } else {
        req.token = null;
    }

    next();
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}