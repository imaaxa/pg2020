const mongoose = require('mongoose');
const Book = mongoose.model('Book');

// Books: Get all
const booksAll = (req, res) => {
  res.status(200).json({"status": "success"});
};

// Book: Create
const booksCreate = (req, res) => {
  res.status(200).json({"status": "success"});
};

// Book: Get One
const booksOne = (req, res) => {
  res.status(200).json({"status": "success"});
};

// Book: Update One
const booksUpdateOne = (req, res) => {
  res.status(200).json({"status": "success"});
};

// Book: Delete One
const booksDeleteOne = (req, res) => {
  res.status(200).json({"status": "success"});
};

module.exports = {
  booksAll,
  booksCreate,
  booksOne,
  booksUpdateOne,
  booksDeleteOne
};
