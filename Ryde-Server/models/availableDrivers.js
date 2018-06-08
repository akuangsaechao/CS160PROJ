var mongoose = require('mongoose');

var availableDriverSchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: true
  },
  driverLongitude: {
    type: Number
  },
  driverLatitude: {
    type: Number,
  },
  driverAvailability: {
    type: Boolean,
    required: true
  }
});

mongoose.model('AvailableDriver', availableDriverSchema);