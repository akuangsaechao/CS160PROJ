var mongoose = require( 'mongoose' );

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
  startLocation: {
    type: String,
    required: true
  },
  endLocation: {
    type: String,
    required: true
  }
});

mongoose.model('History', historySchema);