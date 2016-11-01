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
  riderLongitute: {
    type: Number,
    required: true
  },
  riderLatitude: {
    type: Number,
    required: true
  }
});

mongoose.model('RiderRequest', riderRequestSchema);