const express = require('express');
const router = express.Router();

const RegisterController = require('../controllers/RegisterController');
const LoginController = require('../controllers/LoginController');
const LogoutController = require('../controllers/LogoutController');
const FetchUserController = require('../controllers/FetchUserController');
const EditUserController = require('../controllers/EditUserController');
const DeleteUserController = require('../controllers/DeleteUserController');
const { validateToken } = require('../JWT');

router.post('/register', RegisterController);

router.post('/login', LoginController);

router.get('/logout', validateToken, LogoutController);

router.post('/user', FetchUserController);

router.post('/edit-user', EditUserController);

router.delete('/delete-user', DeleteUserController);

module.exports = router;