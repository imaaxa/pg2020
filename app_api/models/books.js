const mongoose = require('mongoose');

// Review Schema
const reviewSchema = new mongoose.Schema({
  author: String,
  reviewLink: String,
  rating: {
    type: Number,
    'default': 0,
    min: 0,
    max: 5
  },
  reviewText: String,
  active: {
    type: Boolean,
    'default': true
  },
  createdOn: {
    type: Date,
    'default': Date.now
  }
});

// Format Schema
const formatSchema = new mongoose.Schema({
  format: {
    type: String,
    'default': 'EBook'
  },
  pages: Number,
  formatLink: String,
  cost: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    'default': true
  }
});

// Book Schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  series: String,
  seriesVolume: Number,
  genre: {
    type: String,
    'default': 'Science Fiction'
  },
  author: {
    type: String,
    'default': 'Patricia Gilliam'
  },
  publishDate: {
    type: Date,
    required: true
  },
  isbn10: String,
  isbn13: String,
  description: String,
  language: {
    type: 'String',
    'default': 'English'
  },
  active: {
    type: Boolean,
    'default': true
  },
  formats: [formatSchema],
  reviews: [reviewSchema]
});

// Compiling a model from a schema
mongoose.model('Book', bookSchema, 'Books');
