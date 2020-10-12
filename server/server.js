const express = require('express');
const cors = require('cors');
const app = express();

const routes = require('./app/route');
const { ErrorHandler, handleError } = require('./middlewares/error');

// Connect to database
require('dotenv').config();
require('./helpers/connect');

// CORS
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/api', (_req, res, _next) => {
  res.status(200).json({
    message: 'Pratilipi Assignment',
  });
});

// Routes
app.use('/api', routes);

// Error middleware
app.use(handleError);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  if (err) throw new ErrorHandler(err);
});

process.on('uncaughtException', (err) => {
  // handle the error safely
  if (err) throw new ErrorHandler(err);
});

module.exports = app;
