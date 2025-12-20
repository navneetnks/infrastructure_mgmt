
const express = require('express');

const healthRouter = express.Router();
// Define routes
healthRouter.get('/', (req, res) => {
  res.send('Welcome to the Key-Value Store API. This is 2nd version. ');
});

module.exports = {
    healthRouter,
};