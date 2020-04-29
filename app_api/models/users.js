const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    requiered: true,
    'default': new Date()
  },
  updated: {
    type: Date,
    required: true,
    default: new Date()
  },
  active: {
    type: Boolean,
    default: true
  }
});

// Compiling a model from a schema
mongoose.model('User', userSchema, 'Users');
