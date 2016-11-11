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


//auth is token that can get from login or register
// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.put('/profile', auth, ctrlProfile.profileEdit);

// history
router.get('/history', auth, ctrlHistory.historyRead);

// ride request
router.get('/request', auth, ctrlRideRequest.checkRiderRequest);
router.get('/request', auth, ctrlRideRequest.findAvailableDriver);
router.delete('/request', auth, ctrlRideRequest.completeRiderRequest); // When ride is complete delete request and add to history

// available drivers
router.post('/driver', auth, ctrlAvailableDrivers.makeDriverAvailable);
router.put('/driver', auth, ctrlAvailableDrivers.updateDriverLocation);
router.delete('/driver', auth, ctrlAvailableDrivers.makeDriverUnavailable); // When log out check if driver status is true, delete driver


module.exports = router;
