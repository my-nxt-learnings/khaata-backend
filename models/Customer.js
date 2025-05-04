const mongoose = require('mongoose');
const validator = require('validator');

const customerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Customer name is required'],
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v); 
      },
      message: 'Invalid phone number'
    }
  },
  trustScore: {
    type: Number,
    min: 0,
    max: 10,
    default: 5,
  },
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
