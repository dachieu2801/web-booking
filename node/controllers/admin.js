const mongoose = require('mongoose');

const Hotel = require('../models/hotel')
const User = require('../models/user')
const Room = require('../models/room')
const Transaction = require('../models/transaction')
const paging = require('../util/paging');

const pageCustom = (data, page = 1) => {
  const perPage = 8; // số lượng sản phẩm xuất hiện trên 1 page
  const total_pages = Math.ceil(data.length / perPage)
  const dataRender = paging(data, perPage, page)
  const a = {
    total_pages,
    page,
    results: dataRender
  }
  return a
}

exports.info = async (req, res, next) => {
  try {
    const users = await User.find({})
    const noUser = users.length
    const transactions = await Transaction.find({})
    const now = new Date()
    const yearNow = now.getFullYear().toString()
    //tổng gd trong năm nay
    const noTransaction = transactions.length
    //tổng doanh thu trong năm nay
    const revenue = transactions.reduce((acc, cur) => acc + cur.price, 0)
    //doanh thu tb năm nay
    const totalMonth = []
    transactions.forEach(transaction => {
      const date = `${transaction.updatedAt.getFullYear()}-${transaction.updatedAt.getMonth()}`
      const month = totalMonth.find(a => a === date)
      if (!month) {
        totalMonth.push(date)
      }
    })
    const balance = revenue / (totalMonth.length)
    res.json({
      noUser,
      noTransaction,
      revenue,
      balance
    })
  } catch (err) {
    res.status(404).json({ message: 'Has error' });
  }


};

//lấy all trấnction
exports.transaction = async (req, res, next) => {
  try {
    const page = req.params.page
    const now = new Date()
    const now1 = `${now.getFullYear()}/${now.getMonth()}/${now.getDate()}`
    const dateNow = new Date(now1)
    const transactions = await Transaction.find({})
    if (transactions)
      for (const key in transactions) {
        const a = transactions[key].dateStart
        const b = transactions[key].dateEnd
        let start = new Date(`${a.getFullYear()}/${a.getMonth()}/${a.getDate()}`)
        let end = new Date(`${b.getFullYear()}/${b.getMonth()}/${b.getDate()}`)
        if (dateNow >= start && dateNow < end) {
          const transaction = await Transaction.findById(transactions[key]._id)
          transaction.status = 'Checkin'
          await transaction.save()
        }
        if (dateNow >= end) {
          const transaction = await Transaction.findById(transactions[key]._id)
          transaction.status = 'Checkout'
          await transaction.save()
        }
        if (dateNow < start) {
          const transaction = await Transaction.findById(transactions[key]._id)
          transaction.status = 'Booked'
          await transaction.save()
        }
      }

    const transaction = await Transaction.find({})

    const data = pageCustom(transaction, page)
    res.json({ data })
  } catch (err) {
    res.status(404).json({ message: 'Has error' });
  }
}

//láy all hotel
exports.hotels = async (req, res, next) => {
  try {
    const pagecur = req.params.page

    const hotels = await Hotel.find({})
    const { total_pages, page, results } = pageCustom(hotels, pagecur)

    res.json({ total_pages, page, results, hotels })

  } catch (err) {
    res.status(404).json({ message: 'Has error' });
  }
}

// /delete hotel
exports.deleteHotel = async (req, res, next) => {
  try {
    const idHotel = req.body._id
    await Hotel.findByIdAndRemove(idHotel)
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    res.status(404).json({ message: 'Has error' });
  }
}
//tạo hotel

exports.createHotel = async (req, res, next) => {
  try {
    const photos = req.body.photos.split(',')
    let rooms = []
    if (req.body.rooms) {
      rooms = req.body.rooms.split(',')
    }
    const hotel = new Hotel({
      ...req.body,
      rating: 0,
      photos,
      rooms
    });
    await hotel.save()
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    res.status(404).json({ message: 'Has error' });
  }
}

//lays hotel to edit
exports.detailHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.json({ hotel });
  } catch (err) {
    res.status(404).json({ message: 'Has error' });
  }
}
//lays hotel to edit
exports.editHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.body._id);
    const photos = req.body.photos.toString().split(',')
    let rooms = []
    if (req.body.rooms) {
      rooms = req.body.rooms.split(',')
    }
    hotel.name = req.body.name
    hotel.type = req.body.type
    hotel.city = req.body.city
    hotel.address = req.body.address
    hotel.distance = req.body.distance
    hotel.title = req.body.title
    hotel.photos = photos
    hotel.desc = req.body.desc
    hotel.featured = req.body.featured
    hotel.rooms = rooms
    hotel.cheapestPrice = req.body.cheapestPrice

    await hotel.save()
    res.json({ message: 'okee' });
  } catch (err) {
    res.status(404).json({ message: 'Has error' });
  }
}




//láy all rooms
exports.rooms = async (req, res, next) => {
  try {
    const pagecur = req.params.page

    const rooms = await Room.find({})
    const { total_pages, page, results } = pageCustom(rooms, pagecur)

    res.json({ total_pages, page, results, rooms })

  } catch (err) {
    res.status(404).json({ message: 'Has error' });
  }
}

// /delete hotel
exports.deleteRoom = async (req, res, next) => {
  try {
    const idRoom = req.body._id
    await Room.findByIdAndRemove(idRoom)
    res.status(200).json({ message: 'Success' });
  } catch (err) {
    res.status(404).json({ message: 'Has error' });
  }
}


//tạo room
exports.createRoom = async (req, res, next) => {
  try {
    //addrooom
    const _id = new mongoose.Types.ObjectId()
    const roomNumbers = req.body.room.roomNumbers.split(',')
    const room = new Room({
      ...req.body.room,
      roomNumbers,
      _id
    });

    await room.save()
    const hotel = await Hotel.findById(req.body.hotel)
    const rooms = hotel.rooms
    rooms.push(_id.toString())
    hotel.rooms = rooms
    await hotel.save()

    res.status(200).json({ message: 'Success' });
  } catch (err) {
    res.status(404).json({ message: 'Has error' });
  }
}

//lays rooom to edit
exports.detailRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.json({ room });
  } catch (err) {
    res.status(404).json({ message: 'Has error' });
  }
}

//lays rooom to edit
exports.editRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.body._id);
    let roomNumbers = req.body.roomNumbers.toString().split(',')
    room.desc = req.body.desc
    room.maxPeople = req.body.maxPeople
    room.price = req.body.price
    room.roomNumbers = roomNumbers
    room.title = req.body.title
    await room.save()
    res.json({ room });
  } catch (err) {
    res.status(404).json({ message: 'Has error' });
  }
}

