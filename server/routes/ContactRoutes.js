const express = require('express');
const router = express.Router();

const SaveContactController = require('../controllers/SaveContactController');
const FetchContactsController = require('../controllers/FetchContactsController');
const DeleteContactController = require('../controllers/DeleteContactController');

router.post('/save', SaveContactController);
router.get('/contacts/:id', FetchContactsController);
router.delete('/:uuid/:owner', DeleteContactController);

module.exports = router;