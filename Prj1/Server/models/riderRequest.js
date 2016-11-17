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
  riderStartLongitute: {
    type: Number,
    required: true
  },
  riderStartLatitude: {
    type: Number,
    required: true
  },
  riderEndLongitute: {
    type: Number,
    required: true
  },
  riderEndLatitude: {
    type: Number,
    required: true
  }
});

mongoose.model('RiderRequest', riderRequestSchema);