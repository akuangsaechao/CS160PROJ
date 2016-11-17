var mongoose = require('mongoose');
var History = mongoose.model('History');

module.exports.riderHistoryRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    History.find({riderName : req.payload.username}, function(err, history) {
        res.status(200).json(history);
    });
  }

};

module.exports.driverHistoryRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    History.find({driverName : req.payload.username}, function(err, history) {
        res.status(200).json(history);
    });
  }

};