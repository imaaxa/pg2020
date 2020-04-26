const mongoose = require('mongoose');
const Book = mongoose.model('Book');

// Creates new format subdocument
const doAddFormat = (req, res, book) => {
  // Test if book object exists
  if (!book) {
    res.status(400).json({"message": "Book not found"});
  } else {
    // Create format object
    const active = _isActive(req.body.active);
    const {format, pages, formatLink, cost} = req.body;

    // Add new format object to the formats array
    book.formats.push({ format, pages, formatLink, cost, active });

    // Save book
    book.save((err, book) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json(book);
      }
    });
  }
};

// Format: Get all
const formatsAll = (req, res) => {
  res.status(200).json(req.params);
};

// Format: Create
const formatsCreate = (req, res) => {
  const bookId = req.params.bookId;

  // Find book by id
  Book
    .findById(bookId)
    .exec((err, book) => {
      // Test for no results and error
      if (!book) {
        return res.status(404).json({"message": "Formats not found"});
      } else if (err) {
        return res.status(404).json(err);
      } else {
        // Call to create and save format
        doAddFormat(req,res, book);
      }

    });
}; // Working

// Format: ReadOne
const formatsReadOne = (req, res, next) => {
  /*const bookId = req.params.bookId;
  const formatId = req.params.formatId;

  // Find book by id
  Book
    .findById(bookId)
    .select('formats')
    .exec((err, formats) => {
      // Test for no results and error
      if (!formats) {
        return res.status(404).json({"message": "Formats not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Return format that matches formatId
      res.status(200).json(formats);
    });*/
    res.status(200).json({"messagge": "Success"});
};

// Format: UpdateOne
const formatsUpdateOne = (req, res) => {
  res.status(200).json(req.params);
};

// Format: DeleteOne
const formatsDeleteOne = (req, res) => {
  res.status(200).json(req.params);
};

// Determin active
function _isActive(data = 'undefined') {
  return (data !== 'undefined') ? data : true;
}

// Export Format functions
module.exports = {
  formatsAll,
  formatsCreate,
  formatsReadOne,
  formatsUpdateOne,
  formatsDeleteOne
};
