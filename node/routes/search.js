const path = require('path');

const express = require('express');

const searchController = require('../controllers/search');

const router = express.Router();

router.post('/', searchController.search);
module.exports = router;
