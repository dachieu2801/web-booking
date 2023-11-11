const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/login', userController.login);
router.post('/create-account', userController.addUser);

module.exports = router;
