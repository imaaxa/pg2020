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
  const bookId = req.params.bookId;

  // Find book by id
  Book
    .findById(bookId)
    .select('formats')
    .exec((err, formats) => {
      // Test for no results and error
      if (!formats) {
        return res.status(404).json({
          "message": "Formats not found"
        });
      } else if (err) {
        return res.status(404).json(err);
      }

      // Return results
      console.log('Formats have been found');
      res.status(200).json(formats);
    });
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
};

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
  res.status(200).json(req.params.bookId);
  /*const bookId = req.params.bookId;
  const formatId = req.params.formatId;

  if (!bookId || !formatId) {
    return res.status(404).json({"messagge": "Not found, book id and format id are both required"});
  }

  Book
    .findById(bookId)
    .select('formats')
    .exec((err, book) => {
      // Test for no results and error
      if (!book) {
        return res.status(404).json({"messagge": "Book not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Test if formats was returned, 404 if not
      if (book.formats && book.formats > 0) {
        const thisFormat = book.fomats.id(formatId);

        // Test if given id exist inside the format objects
        if (!thisFormat) {
          return res.status(404).json({"messagge": "Format not found"});
        } else if (err) {
          return res.status(404).json(err);
        } else {
          // Set new values
          thisFormat.format = req.body.format;
          thisFormat.pages = req.body.pages;
          thisFormat.formatLink = req.body.formatLink;
          thisFormat.cost = req.body.cost;
          thisFormat.active = _isActive(req.body.active);

          // Save book
          book
            .save((err, book) => {
              if (err) {
                return res.status(404).json({"messagge": "Format not found"});
              } else if (err) {
                return res.status(200).json(book);
              }
            });
        }
      } else {
        return res.status(404).json({"messagge": "No format to update"});
      }
    });//*/
};

// Format: DeleteOne
const formatsDeleteOne = (req, res) => {
  res.status(200).json({"status": "success"});
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
