const path = require('path');

const express = require('express');

const hotelController = require('../controllers/hotel');

const router = express.Router();

router.post('/room', hotelController.getRoom);
router.get('/height_rate', hotelController.heightRateHotels);
router.get('/:id', hotelController.detailHotel);
router.get('/', hotelController.getHotel);
module.exports = router;
