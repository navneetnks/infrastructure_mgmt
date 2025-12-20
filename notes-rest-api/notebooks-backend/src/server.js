const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
    console.log(`Notebooks Server is running on port ${PORT}`);
});
}).catch(err => console.error(err));

app.use(bodyParser.json());

app.get('/api/notebooks', (req, res) => {
  res.send('Welcome to the Notebooks API. Hot Reload');
});


module.exports = app;