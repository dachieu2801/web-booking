const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
  username: { type: String },
  password: { type: String, required: [true, 'Password required'] },
  fullName: { type: String, required: [true, 'FullName required'] },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'Phone number required']
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
    required: [true, 'Email required']
  },
  isAdmin: { type: Boolean },
});
module.exports = mongoose.model('User', User);