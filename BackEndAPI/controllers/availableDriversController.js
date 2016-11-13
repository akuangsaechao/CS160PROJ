var mongoose = require('mongoose');
var AvailableDriver = mongoose.model('AvailableDriver');
var User = mongoose.model('User');

module.exports.makeDriverAvailable = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

      User
      .findById(req.payload._id)
      .exec(function(err, user) {

        if (err){
          res.status(404).json(err);
          return;
        }

        if (user.driverStatus == true){
          var availableDriver = new AvailableDriver();

          availableDriver.driverName = user.username;
          availableDriver.driverLongitude = req.body.driverLongitude;
          availableDriver.driverLatitude = req.body.driverLatitude;
          availableDriver.save(function(err) {
            res.status(200);
            res.json({
              "message" : "You are available"
            });
          }); 
        }  

      }); 

  }

};

module.exports.makeDriverUnavailable = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

      User
      .findById(req.payload._id)
      .exec(function(err, user) {

        if (err){
          res.status(404).json(err);
          return;
        }

        if (user.driverStatus == true){

          AvailableDriver.remove({ driverName: req.body.driverName }, function (err, result) {

            if (err) { 
              res.status(404).json(err);
              return;
            }

            // Available Driver Found
            if (result) {
              res.status(200);
              res.json({
                "message" : "You are unavailable"
              });
            }

            // No Available Driver Found
            if (request === null) {
              res.status(401).json({ "message" : "You are not available"});
            } 

          });
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

      User
      .findById(req.payload._id)
      .exec(function(err, user) {

        if (err){
          res.status(404).json(err);
          return;
        }

        if (user.driverStatus == true){

          AvailableDriver.update({ driverName: user.username }, function (err, availableDriver) {

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

      }); 

  }

};