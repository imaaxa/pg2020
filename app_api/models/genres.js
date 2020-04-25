const mongoose = require('mongoose');

// Genre Schema
const genreSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: true,
    'default': 'Science Fiction'
  },
  active: {
    type: Boolean,
    'default': true
  }
});

// Compiling a model from a schema
mongoose.model('Genre', genreSchema, 'Genres');
