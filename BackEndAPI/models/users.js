var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  creditCard: {
    type: String,
    required: true
  },
  driverStatus: {
    type: Boolean,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    firstname: this.firstName,
    lastName: this.lastName,
    driverStatus: this.driverStatus,
    exp: parseInt(expiry.getTime() / 1000),
  }, config.secret); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', userSchema);
