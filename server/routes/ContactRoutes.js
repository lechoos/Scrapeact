const express = require('express');
const router = express.Router();

const SaveContactController = require('../controllers/SaveContactController');
const FetchContactsController = require('../controllers/FetchContactsController');

router.post('/save', SaveContactController);
router.get('/contacts/:id', FetchContactsController);

module.exports = router;