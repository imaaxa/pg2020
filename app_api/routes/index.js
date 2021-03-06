const express = require('express');
const router = express.Router();

// Image upload
  // Handles file upload setting
  const multer = require('multer');
  const path = require('path');
  const fs = require('fs');

  function getImageName(orgName, curComponent) {
    // Build file name
    return curComponent.toLowerCase() + '_' + Date.now() + path.extname(orgName);
  }

  function getImageDir(component) {
    Date.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    function shortMonth(month) {
      return Date.shortMonths[month];
    }

    const month = shortMonth(new Date().getMonth());
    // Build directory path
    return path.join(__dirname, '../../public/images/' + component + '/' + new Date().getFullYear() + '/' + month + '/');
  }

  // Set image storage options
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Get directory for the image
      const imageDir = getImageDir(req.route.path.substring(1));

      // Create directory if it does not exist
      if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, {recursive: true});
      }

      // Pass that to the callback function
      cb(null, imageDir);
    },
    filename: function (req, file, cb) {
      // Get new file name with ext
      imageName = getImageName(file.originalname, req.route.path.substring(1));
      cb(null, imageName);
    }
  });

  // Set a filter for types of files that will be accepted
  const fileFilter = (req, file, cb) => {
    // Allowe file types
    const fileTypes = /jpeg|jpg|png|gif/;

    // Check the file extention
    const extentionType = fileTypes.test(path.extname(file.originalname).toLowerCase());

    // Check mimetype
    const mimeType = fileTypes.test(file.mimetype);

    // Test file for allowed types
    if (extentionType && mimeType) {
      return cb(null, true);
    } else {
      cb('Error: Images only', false);
    }
  };

  // Initial upload function
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 // 1 MB
    },
    fileFilter: fileFilter
  });
// End  Image upload

// Books:
  // Books: Controler
  const ctrlBooks = require('../controllers/books');

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
  // Formats: Controler
  const ctrlFormats = require('../controllers/formats');

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
  // Reviews: Controler
  const ctrlReviews = require('../controllers/reviews');

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
  // Genres: Controler
  const ctrlGenres = require('../controllers/genres');

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

// Blogs:
  // Blog: Controler
  const ctrlBlogs = require('../controllers/blog');

  // Blog: Get, Create
  router.route('/blogs')
    .get(ctrlBlogs.blogsAll)
    .post(upload.single('image'), ctrlBlogs.blogsCreate);

  // Blog: Get active
  router.route('/blogs/active')
    .get(ctrlBlogs.blogsActive);

  // Blog: Get one, Update One, Delete one
  router.route('/blogs/:blogId')
    .get(ctrlBlogs.blogsOne)
    .put(ctrlBlogs.blogsUpdateOne)
    .delete(ctrlBlogs.blogsDeleteOne);
// End Blogs:

// Users:
  // Users: Controler
  const ctrlUsers = require('../controllers/users');

  // Users: Get all, Create
  router.route('/users')
    .get(ctrlUsers.usersAll)
    .post(ctrlUsers.usersCreate);

  // Users: Get active
  router.route('/users/active')
    .get(ctrlUsers.usersActive);

  // Users: Get one, Update one, Delete one
  router.route('/users/:userId')
    .get(ctrlUsers.usersOne)
    .put(ctrlUsers.usersUpdateOne)
    .delete(ctrlUsers.usersDeleteOne);
// End Users:

// Roles:
  // Roles: Controler
  const ctrlRoles = require('../controllers/roles');

  // Roles: Get all, Create
  router.route('/roles')
    .get(ctrlRoles.rolesAll)
    .post(ctrlRoles.rolesCreate);

  // Roles: Get active
  router.route('/roles/active')
    .get(ctrlRoles.rolesActive);

  // Roles: Get one, Update one, Delete one
  router.route('/roles/:roleId')
    .get(ctrlRoles.rolesOne)
    .put(ctrlRoles.rolesUpdateOne)
    .delete(ctrlRoles.rolesDeleteOne);
// End Roles:

// Export the router
module.exports = router;
