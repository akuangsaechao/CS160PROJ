var mongoose = require('mongoose');
var History = mongoose.model('History');
var AvailableDriver = mongoose.model('AvailableDriver');
var RiderRequest = mongoose.model('RiderRequest');

module.exports.findAvailableDriver = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

    AvailableDriver.find({ username: req.payload.username }, function (err, availableDriver) {

      if (err) { 
        res.status(404).json(err);
        return;
      }

      // Available Driver Found
      if (availableDriver) {

        var riderRequest = new RiderRequest();
        riderRequest.driverName = availableDriver.driverName;
        riderRequest.riderName = req.body.riderName;
        riderRequest.riderStartLongitute = req.body.riderStartLongitute;
        riderRequest.riderStartLatitude = req.body.riderStartLatitude;
        riderRequest.riderEndLongitute = req.body.riderEndLongitute;
        riderRequest.riderEndLatitude = req.body.riderEndLatitude;
        riderRequest.save(function(err) {
          res.status(200);
          res.json({
            "message" : "Your request has been made. Please Wait"
          });
        });   
      }

      // No Available Driver Found
      if (availableDriver === null) {
        res.status(401).json({ "message" : "No available drivers"});
      } 

    });

  }

};

module.exports.checkRiderRequest = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

    RiderRequest.find({ driverName: req.payload.username }, function (err, request) {

      if (err) { 
        res.status(404).json(err);
        return;
      }

      // Available Driver Found
      if (request) {
        res.status(200);
        res.json(request);
      }

      // No Available Driver Found
      if (request === null) {
        res.status(401).json({ "message" : "No request for you"});
      } 

    });

  }

};

module.exports.completeRiderRequest = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

    RiderRequest.find({ driverName: req.payload.username }, function (err, request) {

      if (err) { 
        res.status(404).json(err);
        return;
      }

      // Available Driver Found
      if (request) {

        var history = new History();

        history.riderName = request.riderName;
        history.driverName = request.driverName;
        history.riderStartLongitute = request.riderStartLongitute;
        history.riderStartLatitude = request.riderStartLatitude;
        history.riderEndLongitute = request.riderEndLongitute;
        history.riderStartLatitude = request.riderEndLatitude;
        history.dateOfRide = req.body.dateOfRide;

        AvailableDriver.remove({ driverName: req.payload.username }, function (err, result) {

          if (err) { 
            res.status(404).json(err);
            return;
          }

          // Available Driver Found
          if (result) {
            res.status(200);
            res.json({
              "message" : "Ride Completed"
            });
          }

        });

      }

      // No Available Driver Found
      if (request === null) {
        res.status(401).json({ "message" : "No request for you"});
      } 

    });
  }

};