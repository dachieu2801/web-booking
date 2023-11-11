const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// router.get('/edit/:_id', adminController.getToEdit);
router.delete('/rooms/delete', adminController.deleteRoom);
router.post('/rooms/create-room', adminController.createRoom);
router.get('/rooms/:page', adminController.rooms);
router.put('/rooms/edit/', adminController.editRoom);
router.get('/rooms/edit/:id', adminController.detailRoom);

router.delete('/hotels/delete', adminController.deleteHotel);
router.post('/hotels/create-hotel', adminController.createHotel);
router.get('/hotels/:page', adminController.hotels);
router.put('/hotels/edit/', adminController.editHotel);
router.get('/hotels/edit/:id', adminController.detailHotel);

router.get('/transaction/:page', adminController.transaction);
router.get('/', adminController.info);

module.exports = router;
