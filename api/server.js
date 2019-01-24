const express = require('express');
const configMiddleware = require('../middleware/configMiddleware');
const errorHandlers = require('../middleware/errorHandlers');

const userRouter = require('./users');

const server = express()

configMiddleware(server);

// Sanity check
server.get('/', (req, res) => {
  res.send("👋🌎🌍🌏, root dir sanity check");
});

server.use('/api', userRouter);
server.use(errorHandlers.notFound);
server.use(errorHandlers.errorHandler);

module.exports = server;