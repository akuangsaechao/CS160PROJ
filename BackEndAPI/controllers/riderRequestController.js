var mongoose = require('mongoose');
//var History = mongoose.model('History');

module.exports.findAvailableDriver = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

      // Look for available driver

      // If not return no drivers available

      // If a driver is available then add driver and rider location

  }

};

module.exports.checkRiderRequest = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

      // Look for available requests for driver where driver usernames are true

  }

};

module.exports.completeRiderRequest = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

      // Delete request after completion

  }

};