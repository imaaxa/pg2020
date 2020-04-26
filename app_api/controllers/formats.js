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
}; // Working

// Format: Get all
const formatsAll = (req, res) => {
    const bookId = req.params.bookId;

    // Test if the book id is present
    if (!bookId) {
      return res.status(404).json({"message": "Not found. Book and format are both required"});
    }

    // Get the formats for the book
    Book
      .findById(bookId)
      .select('formats')
      .exec((err, book) => {
        // Test for no results or error
        if (!book) {
          return res.status(404).json({
            "message": "Book not found"
          });
        } else if (err) {
          return res.status(400).json(err);
        }

        res.status(200).json(book.formats);
      });
}; // Working

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
  const bookId = req.params.bookId;
  const formatId = req.params.formatId;

  // Test if the book id and format id are present
  if (!bookId || !formatId) {
    return res.status(404).json({"message": "Not found. Book and format are both required"});
  }

  // Get the formats for the book
  Book
    .findById(bookId)
    .select('formats')
    .exec((err, book) => {

      // Test for no results or error
      if (!book) {
        return res.status(404).json({"message": "Book not found"});
      } else if (err) {
        return res.status(400).json(err);
      }

      // Tests book format existance and greater than 0
      if (book.formats && book.formats.length > 0) {
        if (!book.formats.id(formatId)) {
          return res.status(404).json({"message": "Format not found"});
        } else {
          // Return the specific format from the array
          res.status(200).json(book.formats.id(formatId));
        }
      } else {
        res.status(404).json({"message": "No formats to return"});
      }
    });
}; // Working

// Format: UpdateOne
const formatsUpdateOne = (req, res) => {
  const bookId = req.params.bookId;
  const formatId = req.params.formatId;

  // Test if the book id and format id are present
  if (!bookId || !formatId) {
    return res.status(404).json({
      "message": "Not found. Book and format are both required"
    });
  }

  // Start the process for delete
  Book
    .findById(bookId)
    .select('formats')
    .exec((err, book) => {

      // Test for no results or error
      if (!book) {
        return res.status(404).json({
          "message": "Book not found"
        });
      } else if (err) {
        return res.status(400).json(err);
      }

      // Tests book format existance and greater than 0
      if (book.formats && book.formats.length > 0) {
        const thisFormat = book.formats.id(formatId)
        if (!thisFormat) {
          return res.status(404).json({"message": "Format not found"});
        } else {
          // Update the specific format with the new data
          const active = _isActive(req.body.active);
          thisFormat.format = req.body.format;
          thisFormat.pages = req.body.pages;
          thisFormat.formatLink = req.body.formatLink;
          thisFormat.cost = req.body.cost;
          thisFormat.active = active;

          // Save the book
          book.save(err => {
            if (err) {
              res.status(404).json(err);
            } else {
              res.status(200).json(book.formats.id(formatId));
            }
          });
        }
      } else {
        res.status(404).json({
          "message": "No format to update"
        });
      }
    });
}; // Working

// Format: DeleteOne
const formatsDeleteOne = (req, res) => {
  const bookId = req.params.bookId;
  const formatId = req.params.formatId;

  // Test if the book id and format id are present
  if (!bookId || !formatId) {
    return res.status(404).json({"message": "Not found. Book and format are both required"});
  }

  // Start the process for delete
  Book
  .findById(bookId)
  .select('formats')
  .exec((err, book) => {

    // Test for no results or error
    if (!book) {
      return res.status(404).json({"message": "Book not found"});
    } else if (err) {
      return res.status(400).json(err);
    }

    // Tests book format existance and greater than 0
    if (book.formats && book.formats.length > 0) {
      if (!book.formats.id(formatId)) {
        return res.status(404).json({"message": "Format not found"});
      } else {
        // Remove the specific format from the array
        book.formats.id(formatId).remove();

        // Save the book
        book.save(err => {
          if (err) {
            res.status(404).json(err);
          } else {
            res.status(204).json(null);
          }
        });
      }
    } else {
      res.status(404).json({"message": "No format to delete"});
    }
  });
}; // Working

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
