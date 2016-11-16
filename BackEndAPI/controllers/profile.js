var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    console.log(req.payload);
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

        var updatedUser = user;

        updatedUser.username = req.body.username;
        updatedUser.firstName = req.body.firstName;
        updatedUser.lastName = req.body.lastName;
        updatedUser.phoneNumber = req.body.phoneNumber;
        updatedUser.creditCard = req.body.creditCard;
        updatedUser.setPassword(req.body.password);
        updatedUser.save(function(err) {
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