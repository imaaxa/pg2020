// Database connection
const mongoose = require('mongoose');

// Set dbURI based upon dev || production
let dbURI = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGODB_URI;
}

// Open Mongoose connection
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Monitor the DB connection events and log any messages
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Close DB connection
const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

// Monitor Node processes for shutdown/restart and close DB connection
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

// Models
require('./books');
