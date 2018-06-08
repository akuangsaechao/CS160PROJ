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
  crypto.pbkdf2('secret', this.salt, 100000, 64, 'sha512', (err, derivedKey) => {
    if (err) throw err;
    this.hash = derivedKey.toString('hex');  // '3745e48...08d59ae'
  });
};

userSchema.methods.validPassword = function(password) {
  var hash;
  crypto.pbkdf2('secret', this.salt, 100000, 64, 'sha512', (err, derivedKey) => {
    if (err) throw err;
    hash = derivedKey.toString('hex');  // '3745e48...08d59ae'
  });  
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
  }, config.secret);
};

mongoose.model('User', userSchema);
