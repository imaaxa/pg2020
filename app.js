const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const path = require('path');

// Require Database connection data
require('./app_api/models/db');

// Set the Route paths
const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// Set up middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set routes
app.use('/', indexRouter);
app.use('/api', apiRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
