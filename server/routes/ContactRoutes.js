const express = require('express');
const router = express.Router();

const SaveContactController = require('../controllers/SaveContactController');
const UpdateContactController = require('../controllers/UpdateContactController');
const FetchContactsController = require('../controllers/FetchContactsController');
const DeleteContactController = require('../controllers/DeleteContactController');

router.post('/save', SaveContactController);
router.post('/update-contacts/:id', UpdateContactController);
router.get('/contacts/:id', FetchContactsController);
router.delete('/:uuid/:owner', DeleteContactController);

module.exports = router;
