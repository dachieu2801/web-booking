const Hotel = require('../models/hotel')
const Room = require('../models/room')
const Transaction = require('../models/transaction')

//all
exports.getHotel = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({ type: 'hotel' })
    if (hotels.length === 0) {
      throw new Error('Haven\'t hotels')
    }
    if (req.query.city) {
      let city = req.query.city === 'hanoi'
        ? 'Ha Noi' : req.query.city === 'hochiminh'
          ? 'Ho Chi Minh' : 'Da Nang'
      const hotels = await Hotel.find({ city: city })
      return res.json(hotels)
    }
    if (req.query.type) {
      const hotels = await Hotel.find({ type: req.query.type })
      return res.json(hotels)
    }
    res.json(hotels)
  } catch (err) {
    res.status(404).json({ message: err })
  }
};

//top 3 hotel height rate
exports.heightRateHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({})

    if (hotels.length === 0) {
      throw new Error('Haven\'t hotels')
    } else {
      hotels.sort((a, b) => b.rating - a.rating);
      const rateHotels = []
      for (let i = 0; i < 3; i++) {
        rateHotels.push(hotels[i])
      }
      res.json(rateHotels)
    }

  } catch (err) {
    res.status(404).json({ message: err })
  }
};

//info 1 hotel
exports.detailHotel = async (req, res, next) => {
  try {
    const id = req.params.id
    const hotel = await Hotel.findById(id).exec();
    // console.log(rooms);
    if (!hotel) {
      throw new Error({ 'message': 'Hotel not exist' })
    }
    res.json({ hotel })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
};

//ren các phòng còn trống của hotel trong khoảng tgian
exports.getRoom = async (req, res, next) => {
  try {
    const id = req.body._id
    const startDate = new Date(req.body.dateStart)
    const endDate = new Date(req.body.dateEnd)
    const hotel = await Hotel.findById(id).exec();
    const idRooms = hotel.rooms
    //all Room of hotel
    const rooms = []
    for (let i = 0; i < idRooms.length; i++) {
      const room = await Room.findById(idRooms[i]).exec();
      // console.log(room);
      rooms.push(room)
    }
    //transaction các phong đã đc đặt
    let roomsExist = []
    const trasaction = await Transaction.find({ hotel: id }).exec()
    trasaction.forEach(room => {
      if (room.dateStart <= startDate && startDate <= room.dateEnd ||
        room.dateStart <= endDate && endDate <= room.dateEnd ||
        room.dateStart >= startDate && endDate >= room.dateEnd) {
        room.room.forEach(a => roomsExist.push(a))
      }
    })
    // room trống   
    rooms.forEach((room, i) => {
      roomsExist.forEach((num, j) => {
        const indexRoomExits = room.roomNumbers.findIndex(a => a === num)
        if (indexRoomExits !== -1) {
          rooms[i].roomNumbers.splice(indexRoomExits, 1)
        }
      })
    })
    
    res.json({ rooms })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
};




