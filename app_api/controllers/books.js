const mongoose = require('mongoose');
const Book = mongoose.model('Book');

// Books: Get all
const booksAll = (req, res) => {
  Book
    .find()
    .exec((err, books) => {
      // Test for no results and error
      if (!books) {
        return res.status(400).json({"message": "Books not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Return results
      console.log('Books have been found');
      res.status(200).json(books);
    });
};

// Books: Get active
const booksActive = (req, res) => {
  Book
    .find({active: "true"})
    .exec((err, books) => {
      // Test for no results and error
      if (!books) {
        return res.status(400).json({
          "message": "Books not found"
        });
      } else if (err) {
        return res.status(404).json(err);
      }

      // Return results
      console.log('Books have been found');
      res.status(200).json(books);
    });
};

// Book: Create
const booksCreate = (req, res) => {
  // Create data object
  let active = true;
  if (req.body.active !== 'undefined') {
    active = req.body.active;
  }
  const data = {
    "title": req.body.title,
    "series": req.body.series,
    "seriesVolume": req.body.seriesVolume,
    "genre": req.body.genre,
    "author": req.body.author,
    "publishDate": req.body.publishDate,
    "isbn10": req.body.isbn10,
    "isbn13": req.body.isbn13,
    "description": req.body.description,
    "language": req.body.language,
    "active": active
  };

  // Create book record
  Book
    .create(data, (err, book) => {
      if (err) {
        res.status(400).json(err);
      } else {
        console.log('Book has been crated');
        res.status(201).json(book);
      }
    });
};

// Book: Get One
const booksOne = (req, res) => {
  const bookId = req.params.bookId;

  // Find book by id
  Book
    .findById(bookId)
    .exec((err, book) => {
      // Test for no results and error
      if (!book) {
        return res.status(404).json({"message": "Book not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Return results
      console.log('Book has been found');
      res.status(200).json(book);
    });
};

// Book: Update One
const booksUpdateOne = (req, res) => {
  const bookId = req.params.bookId;

  // Find specific record to update
  Book
    .findById(bookId)
    .exec((err, book) => {
      // Test for no results and error
      if (!book) {
        return res.status(404).json({"message": "Book not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Change values and save
      book.title = req.body.title;
      book.series = req.body.series;
      book.seriesVolume = req.body.seriesVolume;
      book.genre = req.body.genre;
      book.author = req.body.author;
      book.publishDate = req.body.publishDate;
      book.isbn10 = req.body.isbn10;
      book.isbn13 = req.body.isbn13;
      book.description = req.body.description;
      book.language = req.body.language;
      book.active = _isActive(req.body.active);

      book
        .save((err, results) => {
          if (err) {
            res.status(200).json(err);
          } else {
            res.status(200).json(results);
          }
        });
    });
};

// Book: Delete One
const booksDeleteOne = (req, res) => {
  const bookId = req.params.bookId;
  const newActiveValue = _isActive(req.body.active);

  // Find specific record to update
  Book
    .findById(bookId)
    .exec((err, book) => {
      // Test for no results and error
      if (!book) {
        return res.status(404).json({"message": "Book not found"});
      } else if (err) {
        return res.status(404).json(err);
      }

      // Change active status and save
      book.active = newActiveValue;
      book
        .save((err, results) => {
          if (err) {
            res.status(400).json(err);
          } else {
            // Return results
            console.log('Book active status saved');
            res.status(200).json(results);
          }
        });
    });
};

// Determin active
function _isActive(data = 'undefined') {
  return (data !== 'undefined') ? data : true;
}

// Export Book functions
module.exports = {
  booksAll,
  booksActive,
  booksCreate,
  booksOne,
  booksUpdateOne,
  booksDeleteOne
};
