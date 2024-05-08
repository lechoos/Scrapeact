const express = require('express');
const router = express.Router();

const ScrapeController = require('../controllers/ScrapeController');

router.post('/scrape', ScrapeController);

module.exports = router;