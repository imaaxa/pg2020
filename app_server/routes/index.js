const express = require('express');
const router = express.Router();

// Controlers
const home = require('../controllers/home'); // Home controler
const about = require('../controllers/about'); // About controler

// Routes
router.get('/', home.index); // Home page
router.get('/about', about.index); // About page

// Export router
module.exports = router;
