const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbConnect = require('./config/dbConfig');
const router = require('./router');
require('dotenv').config();

const app = express();
const port = process.env.PORT; // Set default port if PORT environment variable is not set
const ORIGIN = process.env.ORIGIN;

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  credentials: true,
  origin: ORIGIN // Allow requests from the specified origin
}));

// Routes
app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}, origin: ${ORIGIN}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

module.exports = app;
