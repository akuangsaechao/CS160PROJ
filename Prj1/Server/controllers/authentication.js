var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var AvailableDriver = mongoose.model('AvailableDriver');

module.exports.register = function(req, res) {

  User.findOne({ username: req.body.username }, function (err, user) {

    if (err) { 
      res.status(404).json(err);
      return;
    }

    if (user) {
      res.status(401).json({ "message" : "User already exists"});
    }

    // Return if user not found in database
    if (user === null) {
      var user = new User();
      user.username = req.body.username;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.phoneNumber = req.body.phoneNumber;
      user.creditCard = req.body.creditCard;
      user.driverStatus = req.body.driverStatus;
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
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token,
        driverStatus: user.driverStatus
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};
//mongo
