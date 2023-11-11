const Hotel = require('../models/hotel')
const Room = require('../models/room')
const Transaction = require('../models/transaction')

exports.search = async (req, res, next) => {
  try {
    const noPeople = Number(req.body.aduilt) + Number(req.body.children)
    const noRoom = Number(req.body.room)
    const hotels = await Hotel.find({})
    let results = hotels

    //position
    if (req.body.position) {
      results = results.filter(res => res.city.toUpperCase().includes(req.body.position.toUpperCase()))
      if (results.length === 0) {
        throw new Error('There are no suitable hotels')
      }
    }
    const startDate = new Date(req.body.dateStart)
    const endDate = new Date(req.body.dateEnd)
    //theo ngày
    for (let i = 0; i < results.length; i++) {
      const idRooms = results[i].rooms
      // các phòng của hotels
      const rooms = []
      for (let i = 0; i < idRooms.length; i++) {
        const room = await Room.findById(idRooms[i]).exec();
        rooms.push(room)
      }

      if (startDate.toDateString() !== endDate.toDateString()) {
        //all rooms đã đc đặt trong khoảng tgian
        let roomsExist = []
        const trasaction = await Transaction.find({ hotel: results[i]._id }).exec()
        trasaction.forEach(room => {
          if (room.dateStart <= startDate && startDate <= room.dateEnd ||
            room.dateStart <= endDate && endDate <= room.dateEnd ||
            room.dateStart >= startDate && endDate >= room.dateEnd) {
            room.room.forEach(a => roomsExist.push(a))
          }
        })
        // số phòng chống
        let roomsEmpty = []
        for (let i = 0; i < rooms.length; i++) {
          roomsExist.forEach((num) => {
            const indexRoomExits = rooms[i].roomNumbers.findIndex(a => a === num)
            if (indexRoomExits !== -1) {
              rooms[i].roomNumbers.splice(indexRoomExits, 1)
            }
          })
          if (rooms[i]) {
            if (rooms[i].roomNumbers.length > 0) {
              rooms[i].roomNumbers.forEach(a => {
                roomsEmpty.push({ room: a, maxPeople: rooms[i].maxPeople, price: rooms[i].price })
              })
            }
          }
        }
        results[i].roomsEmpty = roomsEmpty
      } else {
        let roomsEmpty = []
        for (let i = 0; i < rooms.length; i++) {
          if (rooms[i]) {
            if (rooms[i].roomNumbers.length > 0) {
              rooms[i].roomNumbers.forEach(a => {
                roomsEmpty.push({ room: a, maxPeople: rooms[i].maxPeople, price: rooms[i].price })
              })
            }
          }
        }
        results[i].roomsEmpty = roomsEmpty
      }
    }
    results = results.filter(a => a.roomsEmpty.length > 0)
    //theo số lượng người
    if (noPeople) {
      results = results.filter(a => {
        const totalPeople = a.roomsEmpty.reduce((acc, room) => acc + room.maxPeople, 0)
        return totalPeople > noPeople
      })
    }
    //số phòng
    if (noRoom) {
      results = results.filter(a => a.roomsEmpty.length >= noRoom)
    }
    //giá
    if (req.body.minPrice) {
      results = results.filter(a => {
        const is = a.roomsEmpty.find(room => room.price >= Number(req.body.minPrice))
        if (is) {
          return true
        } else {
          return false
        }
      })
    }
    if (req.body.maxPrice) {
      results = results.filter(a => {
        const is = a.roomsEmpty.find(room => room.price <= Number(req.body.maxPrice))
        if (is) {
          return true
        } else {
          return false
        }
      })
    }

    if (results.length === 0) {
      throw new Error(`No hotel found`)
    }
    res.json({ results })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
};





