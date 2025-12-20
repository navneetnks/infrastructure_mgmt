
const express = require('express');

const healthRouter = express.Router();
// Define routes
healthRouter.get('/', (req, res) => {
  res.send('Welcome to the Key-Value Store API. This is docker compose watch version. ');
});

module.exports = {
    healthRouter,
};