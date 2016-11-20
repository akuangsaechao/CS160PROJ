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

    AvailableDriver.find({}, function (err, availableDriver) {

      if (err) { 
        res.status(404).json(err);
        return;
      }

      // Available Driver Found
      if (availableDriver) {

        var distances = [];

        for (var drivers in availableDriver){

          var R = 6371e3; // metres
          var driverLatitude = drivers.driverLatitude.toRadians();
          var riderLatitude = req.body.riderStartLatitude.toRadians();
          var latitudeDifference = (riderLatitude-driverLatitude).toRadians();
          var longitudeDifference = (req.body.riderStartLongitute-drivers.driverLongitude).toRadians();
          var a = Math.sin(latitudeDifference/2) * Math.sin(latitudeDifference/2) +
                  Math.cos(driverLatitude) * Math.cos(riderLatitude) *
                  Math.sin(longitudeDifference/2) * Math.sin(longitudeDifference/2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          var d = R * c;
          distances.push(d);

        }

        var min = distances[0]; 
        var index;
        for (var i = 0; i < distances.length; i++){
            if (distances[i] < min){
              index = i;
              min = distances[i];
            }
        }

        var riderRequest = new RiderRequest();
        riderRequest.driverName = availableDriver[index].driverName;
        riderRequest.riderName = req.payload.riderName;
        riderRequest.riderStartLongitute = req.body.riderStartLongitute;
        riderRequest.riderStartLatitude = req.body.riderStartLatitude;
        riderRequest.riderEndLongitute = req.body.riderEndLongitute;
        riderRequest.riderEndLatitude = req.body.riderEndLatitude;
        riderRequest.save();   

        AvailableDriver.remove({ driverName: availableDriver[index].driverName }, function (err, result) {

          if (err) { 
            res.status(404).json(err);
            return;
          }

          // Available Driver Found
          if (result) {
            res.status(200);
            res.json({
              "message" : "Your request has been made. Please Wait"
            });
          }

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

    RiderRequest.find({ driverName: req.payload.username }, function (err, riderRequest) {

      if (err) { 
        res.status(404).json(err);
        return;
      }

      // Available Driver Found
      if (riderRequest) {
        res.status(200);
        res.json(riderRequest);
      }

      // No Available Driver Found
      if (riderRequest === null) {
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

    RiderRequest.findOne({ driverName: req.payload.username }, function (err, request) {

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
        history.save();  

        var availableDriver = new AvailableDriver();

        availableDriver.driverName = request.driverName;
        availableDriver.driverLongitude = request.riderEndLongitute;
        availableDriver.driverLatitude = request.riderEndLatitude;
        availableDriver.save(); 

        RiderRequest.remove({ driverName: req.payload.username }, function (err, result) {

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