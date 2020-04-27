const mongoose = require('mongoose');

// Blogs Schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  image: String,
  author: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: new Date()
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
mongoose.model('Blog', blogSchema, 'Blogs');
