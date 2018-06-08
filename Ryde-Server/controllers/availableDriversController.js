
var mongoose = require('mongoose');
var AvailableDriver = mongoose.model('AvailableDriver');
var User = mongoose.model('User');

module.exports.makeDriverAvailable = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

    if (req.payload.driverStatus == true){

      AvailableDriver.update({ driverName: req.payload.username },
                               {$set : {driverLongitude: req.body.driverLongitude, 
                                        driverLatitude: req.body.driverLatitude,
                                        driverAvailability: true} }, function (err, availableDriver) {

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

  }

};

module.exports.makeDriverUnavailable = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

      if (req.payload.driverStatus == true){
        AvailableDriver.update({ driverName: req.payload.username },
                                 {$set : {driverAvailability: false} }, function (err, availableDriver) {

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

  }

};

module.exports.updateDriverLocation = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

      if (req.payload.driverStatus == true){

        AvailableDriver.update({ driverName: req.payload.username },
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

  }

};