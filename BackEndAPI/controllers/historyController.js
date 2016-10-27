var mongoose = require('mongoose');
var History = mongoose.model('History');

module.exports.historyRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    History
      .findById(req.payload._id)
      .exec(function(err, history) {
        res.status(200).json(history);
      });
  }

};

module.exports.historyWrite = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // add code to insert history
  }

};