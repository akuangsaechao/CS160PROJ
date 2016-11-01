var mongoose = require('mongoose');
//var History = mongoose.model('History');

module.exports.makeDriverAvailable = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

      // Look for available driver

      // If not return no drivers available

  }

};

module.exports.makeDriverUnavailable = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

      // Look for available requests for driver

  }

};

module.exports.updateDriverLocation = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

      // Look for available requests for driver

  }

};