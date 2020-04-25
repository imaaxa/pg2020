const mongoose = require('mongoose');
const Book = mongoose.model('Book');

// Review: Create
const reviewsCreate = (req, res) => {
  res.status(200).json({"status": "success"});
};

// Review: ReadOne
const reviewsReadOne = (req, res) => {
  res.status(200).json({"status": "success"});
};

// Review: UpdateOne
const reviewsUpdateOne = (req, res) => {
  res.status(200).json({"status": "success"});
};

// Review: DeleteOne
const reviewsDeleteOne = (req, res) => {
  res.status(200).json({"status": "success"});
};

// Export Review functions
module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne
};
