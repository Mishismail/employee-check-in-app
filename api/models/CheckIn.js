const mongoose = require('mongoose');

const checkInSchema = mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  locationId: {
    type: String,
    required: true,
  },
  checkInTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  notes: {
    type: String,
    default: 'No notes provided', 
  },
});

const CheckIn = mongoose.model('CheckIn', checkInSchema);

module.exports = CheckIn;
