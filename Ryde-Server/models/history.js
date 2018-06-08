var mongoose = require('mongoose');

var historySchema = new mongoose.Schema({
  riderName: {
    type: String,
    required: true
  },
  driverName: {
    type: String,
    required: true
  },
  dateOfRide: {
    type: String,
    required: true
  },
  riderStartLongitude: {
    type: Number,
    required: true
  },
  riderStartLatitude: {
    type: Number,
    required: true
  },
  riderEndLongitude: {
    type: Number,
    required: true
  },
  riderEndLatitude: {
    type: Number,
    required: true
  }
});

mongoose.model('History', historySchema);