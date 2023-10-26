const express = require('express');
const bodyParser = require('body-parser');
const db = require("./config/database")

// Create an Express application
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies

// Define a sample route
app.get('/', (req, res) => {
  res.send('Hello, Node.js!');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});