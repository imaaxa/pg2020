const express = require('express');
const router = express.Router();

const ctrlBlogs = require('../controllers/blog');
const ctrlBooks = require('../controllers/books');
const ctrlFormats = require('../controllers/formats');
const ctrlGenres = require('../controllers/genres');
const ctrlReviews = require('../controllers/reviews');

// Books:
  // Books: Get, Create
  router.route('/books')
    .get(ctrlBooks.booksAll)
    .post(ctrlBooks.booksCreate);

    // Books: Get active
    router.route('/books/active')
      .get(ctrlBooks.booksActive);

  // Books: Get one, Update one, Delete one
  router.route('/books/:bookId')
    .get(ctrlBooks.booksOne)
    .put(ctrlBooks.booksUpdateOne)
    .delete(ctrlBooks.booksDeleteOne);
// End Books

// Formats:
  // Formats: Get, Create
  router.route('/books/:bookId/formats')
    .get(ctrlFormats.formatsAll)
    .post(ctrlFormats.formatsCreate);

  // Formats: Get one, Update one, Delete one
  router.route('/books/:bookId/formats/:formatId')
    .get(ctrlFormats.formatsReadOne)
    .put(ctrlFormats.formatsUpdateOne)
    .delete(ctrlFormats.formatsDeleteOne);
// End Formats


// Reviews:
  // Reviews: Create
  router.route('/books/:bookId/reviews')
    .post(ctrlReviews.reviewsCreate);

  // Reviews: Get one, Update one, Delete one
  router.route('/books/:bookId/reviews/:reviewId')
    .get(ctrlReviews.reviewsReadOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);
// End Reviews

// Genres:
  // Genres: Get all, Create
  router.route('/genres')
    .get(ctrlGenres.genresAll)
    .post(ctrlGenres.genresCreate);

  // Genres: Get active
  router.route('/genres/active')
    .get(ctrlGenres.genresActive);

  // Genres: Get one, Update one, Delete one
  router.route('/genres/:genreId')
    .get(ctrlGenres.genresOne)
    .put(ctrlGenres.genresUpdateOne)
    .delete(ctrlGenres.genresDeleteOne);
// End Genres

// Blog:
  // Blog: Get, Create
  router.route('/blog')
    .get(ctrlBlogs.blogsAll)
    .get(ctrlBlogs.blogsCreate);

  // Blog: Get active
  router.route('/blog/active')
    .get(ctrlBlogs.blogsActive);

  // Blog: Get one, Update One, Delete one
  router.route('/blog/:blogId')
    .get(ctrlBlogs.blogsOne)
    .get(ctrlBlogs.blogsUpdateOne)
    .get(ctrlBlogs.blogsDeleteOne);
// End Blog:

// Export the router
module.exports = router;
