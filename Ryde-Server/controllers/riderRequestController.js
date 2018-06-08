var mongoose = require('mongoose');
var History = mongoose.model('History');
var AvailableDriver = mongoose.model('AvailableDriver');
var RiderRequest = mongoose.model('RiderRequest');

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};


module.exports.findAvailableDriver = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

    AvailableDriver.find({}, function (err, drivers) {

      if (err) { 
        res.status(404).json(err);
        return;
      }

      availableDriver = []

      console.log(drivers);

      if(drivers.length > 0){
        for(var i = 0; i < drivers.length; i++){
          if(drivers[i].driverAvailability == true){
            availableDriver.push(drivers[i]);
          }
        }
      }

      console.log(availableDriver)

      if (availableDriver.length > 0) {

        var distances = [];
        for (var i = 0; i < availableDriver.length; i++){
          var R = 6371e3; // metres
          var driverLatitude = Math.radians(availableDriver[i].driverLatitude);
          var riderLatitude = Math.radians(req.body.riderStartLatitude);
          var latitudeDifference = Math.radians((req.body.riderStartLatitude-availableDriver[i].driverLatitude));
          var longitudeDifference = Math.radians((req.body.riderStartLongitude-availableDriver[i].driverLongitude));
          var a = Math.sin(latitudeDifference/2) * Math.sin(latitudeDifference/2) + Math.cos(driverLatitude) * Math.cos(riderLatitude) * Math.sin(longitudeDifference/2) * Math.sin(longitudeDifference/2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          var d = R * c;
          distances.push(d);
        }

        var min = distances[0]; 
        var index = 0;
        for (var i = 0; i < distances.length; i++){
          if (distances[i] < min){
            index = i;
            min = distances[i];
          }
        }

        var riderRequest = new RiderRequest();
        riderRequest.driverName = availableDriver[index].driverName;
        riderRequest.riderName = req.payload.username;
        riderRequest.riderStartLongitude = req.body.riderStartLongitude;
        riderRequest.riderStartLatitude = req.body.riderStartLatitude;
        riderRequest.riderEndLongitude = req.body.riderEndLongitude;
        riderRequest.riderEndLatitude = req.body.riderEndLatitude;
        riderRequest.driverLongitude = availableDriver[index].driverLongitude;
        riderRequest.driverLatitude = availableDriver[index].driverLatitude;
        riderRequest.rideAccepted = false;
        riderRequest.save(function(err, result) {
          res.status(200);
          res.json({
            "message" : "Request Successful"
          });
        });

      } else {
        res.status(401).json({ "message" : "No available drivers"});
      }

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

      console.log(req.payload);

      if (err) { 
        res.status(404).json(err);
        return;
      }

      if (riderRequest.length > 0) {
        res.status(200);
        res.json(riderRequest);
      } else {
        res.status(401).json({ "message" : "No request for you"});
      }

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

    RiderRequest.findOne({ driverName: req.payload.username, riderName: req.body.riderName}, function (err, request) {

      if (err) { 
        res.status(404).json(err);
        return;
      }

      if (request) {

        var history = new History();

        history.riderName = request.riderName;
        history.driverName = request.driverName;
        history.riderStartLongitude = request.riderStartLongitude;
        history.riderStartLatitude = request.riderStartLatitude;
        history.riderEndLongitude = request.riderEndLongitude;
        history.riderEndLatitude = request.riderEndLatitude;
        history.dateOfRide = req.body.dateOfRide;
        history.save();  

        AvailableDriver.update({ driverName: request.driverName },
          {$set : {driverAvailability: true, 
            driverLongitude: request.riderEndLongitude,
            driverLatitude: request.riderEndLatitude} }, function (err, availableDriver) {

              if (err) { 
                res.status(404).json(err);
                return;
              }

              if (availableDriver) {

              }

              if (availableDriver === null) {
                res.status(401).json({ "message" : "You are already available"});
              } 

            });

      }

      if (request === null) {
        res.status(401).json({ "message" : "No request for you"});
      } 

    });

    RiderRequest.remove({ driverName: req.payload.username, riderName: req.body.riderName }, function (err, result) {

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

      if (result === null) {
        res.status(401).json({ "message" : "No request for you"});
      } 

    });
  }

};

module.exports.checkRequestAccepted = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

    console.log(req.payload);

    RiderRequest.findOne({ riderName: req.payload.username }, function (err, request) {

      if (err) { 
        res.status(404).json(err);
        return;
      }

      if (request) {
        res.status(200);
        res.json(request);
      }

      if (request === null) {
        res.status(401).json({ "message" : "No request for you"});
      } 

    });
  }

};

module.exports.acceptRiderRequest = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

    AvailableDriver.update({ driverName: req.payload.username },
      {$set : {driverAvailability: false} }, function (err, driver) {

        if (err) { 
          res.status(404).json(err);
          return;
        }

        if (driver) {

        }

        if (driver === null) {
          res.status(401).json({ "message" : "You are already available"});
        } 

      });

    RiderRequest.update({ driverName: req.payload.username, riderName: req.body.riderName },
     {$set : {rideAccepted: true}}, function (err, request) {

      if (err) { 
        res.status(404).json(err);
        return;
      }

      if (request) {
        res.status(200);
        res.json({
          "message" : "Ride Accepted"
        });
      }

      if (request === null) {
        res.status(401).json({ "message" : "No request for you"});
      } 

    });
  }

};

module.exports.cancelRiderRequest = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

    RiderRequest.remove({ driverName: req.payload.username, ridername: req.body.ridername }, function (err, request) {

      if (err) { 
        res.status(404).json(err);
        return;
      }

      if (request) {

        res.status(200);
        res.json({
          "message" : "Successful Decline"
        });

      }

      if (request === null) {
        res.status(401).json({ "message" : "No request for you"});
      } 

    });
  }

};

module.exports.updateDriverLocation = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

    RiderRequest.update({ driverName: req.payload.username, riderName: req.body.riderName },
     {$set : {driverLongitude: req.body.driverLongitude, 
      driverLatitude: req.body.driverLatitude} }, function (err, availableDriver) {

        if (err) { 
          res.status(404).json(err);
          return;
        }

        if (availableDriver) {
          res.status(200);
          res.json({
            "message" : "Available Successful"
          });
        }

        if (availableDriver === null) {
          res.status(401).json({ "message" : "You are already available"});
        } 

      });
    
  }

};