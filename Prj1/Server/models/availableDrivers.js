var mongoose = require('mongoose');

var availableDriverSchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: true
  },
  driverLongitute: {
    type: Number,
    required: true
  },
  driverLatitude: {
    type: Number,
    required: true
  }
});

mongoose.model('AvailableDriver', availableDriverSchema);