var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var AvailableDriver = mongoose.model('AvailableDriver');

module.exports.register = function(req, res) {

  User.findOne({ username: req.body.username }, function (err, user) {

    console.log("test2");

    if (err) { 
      res.status(404).json(err);
      return;
    }

    if (user) {
      res.status(401).json({ "message" : "User already exists"});
    }

    if (user === null) {
      var user = new User();
      user.username = req.body.username;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.phoneNumber = req.body.phoneNumber;
      user.creditCard = req.body.creditCard;
      user.driverStatus = req.body.driverStatus;

      console.log(req.body.driverStatus);

      console.log(user.driverStatus);

      console.log(req.body);

      if (req.body.driverStatus == "true"){

        availableDriver = new AvailableDriver();

        availableDriver.driverName = req.body.username;
        availableDriver.driverAvailability = false;
        availableDriver.driverLongitude = 0;
        availableDriver.driverLatitude = 0;
        availableDriver.save();
      }

      user.setPassword(req.body.password);
      user.save(function(err) {
        var token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token,
          driverStatus: user.driverStatus
        });
      });
      
    }

  });  
};

module.exports.login = function(req, res) {

  passport.authenticate('local', function(err, user, info){

    if (err) {
      res.status(404).json(err);
      return;
    }

    if(user){
      var token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token,
        driverStatus: user.driverStatus
      });
    } else {
      res.status(401).json(info);
    }
  })(req, res);

};