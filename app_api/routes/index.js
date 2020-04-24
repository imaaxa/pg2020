const express = require('express');
const router = express.Router();

const ctrlBooks = require('../controllers/books');
const ctrlReviews = require('../controllers/reviews');
const ctrlGenres = require('../controllers/genres');

// Books: Get, Create
router.route('/books')
  .get(ctrlBooks.booksAll)
  .post(ctrlBooks.booksCreate);

// Books: Get one, Update one, Delete one
router.route('/books/:bookId')
  .get(ctrlBooks.booksOne)
  .put(ctrlBooks.booksUpdateOne)
  .delete(ctrlBooks.booksDeleteOne);

// Reviews: Create
router.route('/books/:bookId/reviews')
  .post(ctrlReviews.reviewsCreate);

// Reviews: Get one, Update one, Delete one
router.route('/books/:bookId/reviews/:reviewId')
  .get(ctrlReviews.reviewsReadOne)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);

// Genres: Get all, Create
router.route('/genres')
  .get(ctrlGenres.genresAll)
  .post(ctrlGenres.genresCreate);

// Genres: Get one, Update one, Delete one
router.route('/genres/:genreId')
  .get(ctrlGenres.genresOne)
  .put(ctrlGenres.genresUpdateOne)
  .delete(ctrlGenres.genresDeleteOne);

module.exports = router;
