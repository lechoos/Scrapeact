const express = require('express');
const router = express.Router();

const SaveContactController = require('../controllers/SaveContactController');

router.post('/save', SaveContactController);

module.exports = router;