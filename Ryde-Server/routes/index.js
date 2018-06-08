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
var ctrlRideRequest = require('../controllers/riderRequestController');
var ctrlAvailableDrivers = require('../controllers/availableDriversController');

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login); //Add driver if driver status is true using function below

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.put('/profile', auth, ctrlProfile.profileEdit);

// history
router.get('/riderHistory', auth, ctrlHistory.riderHistoryRead);
router.get('/driverHistory', auth, ctrlHistory.driverHistoryRead);

// ride request
router.get('/request', auth, ctrlRideRequest.checkRiderRequest);
router.post('/request', auth, ctrlRideRequest.findAvailableDriver);
router.delete('/request', auth, ctrlRideRequest.completeRiderRequest); // When ride is complete delete request and add to history
router.get('/accepted', auth, ctrlRideRequest.checkRequestAccepted);
router.put('/request', auth, ctrlRideRequest.acceptRiderRequest);
router.delete('/cancel', auth, ctrlRideRequest.cancelRiderRequest);
router.put('/location', auth, ctrlRideRequest.updateDriverLocation);

// available drivers
router.put('/available', auth, ctrlAvailableDrivers.makeDriverAvailable);
router.put('/unavailable', auth, ctrlAvailableDrivers.makeDriverUnavailable);
router.put('/driver', auth, ctrlAvailableDrivers.updateDriverLocation); // When log out check if driver status is true, delete driver

module.exports = router;
