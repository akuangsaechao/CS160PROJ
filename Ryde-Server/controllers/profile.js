var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
    .findById(req.payload._id)
    .exec(function(err, user) {
     res.status(200).json(user);
   });
  }

};

module.exports.profileEdit = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

    User
    .findById(req.payload._id)
    .exec(function(err, user) {
      user.username = req.payload.username;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.phoneNumber = req.body.phoneNumber;
      user.creditCard = req.body.creditCard;
      user.setPassword(req.body.password);
      user.save(function(err, updatedUser) {
        var token = updatedUser.generateJwt();
        res.status(200);
        res.json({
          "token" : token,
          "message" : "User update successful"
        });
      }); 

    });

  }

};