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

      AvailableDriver.update({ driverName: req.payload.username }, function (err, availableDriver) {

        if (err) { 
          res.status(404).json(err);
          return;
        }

        // Available Driver Found
        if (availableDriver) {
          updatedDriver = availableDriver;
          updatedDriver.driverLongitude = req.body.driverLongitude;
          updatedDriver.driverLatitude = req.body.driverLatitude;
          updatedDriver.driverAvailability = true;
          updatedDriver.save(function(err) {
            res.status(200);
            res.json({
              "message" : "Available Successful"
            });
          }); 
        }

        // No Available Driver Found
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

        AvailableDriver.update({ driverName: req.payload.username }, function (err, availableDriver) {

          if (err) { 
            res.status(404).json(err);
            return;
          }

          // Available Driver Found
          if (availableDriver) {
            updatedDriver = availableDriver;
            updatedDriver.driverAvailability = false;
            updatedDriver.save(function(err) {
              res.status(200);
              res.json({
              "message" : "Unavailable Successful"
              });
            }); 
          }

          // No Available Driver Found
          if (availableDriver === null) {
            res.status(401).json({ "message" : "You are already unavailable"});
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

        AvailableDriver.update({ driverName: req.payload.username }, function (err, availableDriver) {

          if (err) { 
            res.status(404).json(err);
            return;
          }

          // Available Driver Found
          if (availableDriver) {
            var driver = availableDriver
            driver.driverLongitude = req.body.driverLongitude;
            driver.driverLatitude = req.body.driverLatitude;
            driver.save(function(err) {
              res.status(200);
              res.json({
                "message" : "Location Updated"
              });
            });  
          }

          // No Available Driver Found
          if (request === null) {
            res.status(401).json({ "message" : "You are not available"});
          } 

        });

      }  

  }

};