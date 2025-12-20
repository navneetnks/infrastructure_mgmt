const express = require('express');
const app = express();
const port = process.env.PORT;

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Express server multistage build!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
