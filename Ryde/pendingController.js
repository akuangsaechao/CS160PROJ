app.controller('pendingCtrl', function ($scope, $location, $rootScope, authentication, $timeout) {

    var waiting = function () {
        $rootScope.alert = true;
        console.log("Waiting for driver input");
    }

    var keepChecking = function () {
        authentication.checkForAcceptedRequest().success(function (data) {
            if (data.rideAccepted == true) {
                $rootScope.alert = false;
                $rootScope.driverCurrentPos = {lng: data.driverLongitude, lat: data.driverLatitude};
                console.log("Driver found");
                $location.path('/waiting');
            } else {
                console.log("There are currently no drivers available. Trying again in 5 seconds.")
                $timeout(keepChecking, 5000);
            }
            // Go to map with driver driving to pick up rider
        }).error(function () {
            console.log("There are currently no drivers available. Trying again in 5 seconds.")
            $timeout(keepChecking, 5000);
            // No drivers found
        });
    }

    $scope.cancelRequest = function () {
        authentication.cancelRiderRequest().success(function () {
            alert("We are sorry you have cancelled your ride. Your cancellation is being processed.")
            $location.path('/dashboard');
        });
    }

    waiting();
    keepChecking();

});