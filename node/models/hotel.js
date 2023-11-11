
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Hotel = new Schema({
  name: String,
  cheapestPrice: Number,
  type: String,
  city: String,
  address: String,
  distance: Number,
  photos: Array,
  title: String,
  desc: String,
  rating: { type: Number, min: 0, max: 5 },
  featured: Boolean,
  rooms: { type: Array, },
});
module.exports = mongoose.model('Hotel', Hotel);