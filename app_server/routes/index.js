const express = require('express');
const router = express.Router();

// Controlers
const home = require('../controllers/home'); // Home controler
const about = require('../controllers/about'); // About controler
const books = require('../controllers/books'); // Books controler

// Routes
router.get('/', home.index); // Home page
router.get('/about', about.index); // About page
router.get('/books', books.index); // Books page

// Export router
module.exports = router;
