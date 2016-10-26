var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var config = require('../config');
var auth = jwt({
  secret: config.secret,
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlHistory = require('../controllers/historyController');
var ctrlRideRequest = require('../controllers/rideRequestController');

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.update('/profile', auth, ctrlProfile.profileEdit);

// history
router.get('/history', auth, ctrlHistory.historyRead);


// ride request


module.exports = router;
