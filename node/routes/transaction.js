
const express = require('express');

const transactionController = require('../controllers/transaction');

const router = express.Router();

router.get('/:username', transactionController.getTransaction);
router.post('/', transactionController.createTransaction);

module.exports = router;
