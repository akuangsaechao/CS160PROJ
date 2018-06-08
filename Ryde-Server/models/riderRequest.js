var mongoose = require('mongoose');

var riderRequestSchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: true
  },
  riderName: {
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
  },
  driverLongitude: {
    type: Number,
    required: true
  },
  driverLatitude: {
    type: Number,
    required: true
  },
  rideAccepted: {
    type: Boolean,
    required: true
  }
});

mongoose.model('RiderRequest', riderRequestSchema);