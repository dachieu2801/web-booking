
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Room = new Schema({
  _id: ObjectId,
  title: String,
  price: Number,
  maxPeople: { type: Number, },
  desc: String,
  roomNumbers: Array,
}, { timestamps: true });

module.exports = mongoose.model('Room', Room);