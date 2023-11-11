// const products = [];
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Transaction = new Schema({
    user: String,
    hotel: String,
    nameHotel: String,
    room: Array,
    dateStart: Date,
    dateEnd: Date,
    price: Number,
    payment: String,
    status: String,
}, { timestamps: true });
module.exports = mongoose.model('Transaction', Transaction);