const mongoose = require('mongoose');
const Book= mongoose.model('Book');

// Genres: Get All
const genresAll = (req, res) => {
  res.status(200).json({"status": "success"});
};

// Genres: Create
const genresCreate = (req, res) => {
  res.status(200).json({"status": "success"});
};

// Genres: Get one
const genresOne = (req, res) => {
  res.status(200).json({"status": "success"});
};

// Genres: Update one
const genresUpdateOne = (req, res) => {
  res.status(200).json({"status": "success"});
};

// Genres: Delete one
const genresDeleteOne = (req, res) => {
  res.status(200).json({"status": "success"});
};

// Export Genre functions
module.exports = {
  genresAll,
  genresCreate,
  genresOne,
  genresUpdateOne,
  genresDeleteOne
};
