app.controller('manageRequestCtrl', function ($scope, $location, $rootScope, $timeout, authentication) {

    $scope.items = ['Available', 'Unavailable'];
    $scope.selection = $scope.items[0];
    $scope.hidden = true;
    $scope.data = [{
        driverName: "Boby",
        riderName: "Jim",
        riderStartLongitute: -121.83484174311161,
        riderStartLatitude: 37.312427389433985,
        riderEndLongitute: -120.83484174311161,
        riderEndLatitude: 36.312427389433985,
        rideAccepted: false
    },
    {
        driverName: "Boby2",
        riderName: "Jim2",
        riderStartLongitute: -121.83484174311161,
        riderStartLatitude: 37.312427389433985,
        riderEndLongitute: -120.83484174311161,
        riderEndLatitude: 36.312427389433985,
        rideAccepted: false
    },
    {
        driverName: "Boby3",
        riderName: "Jim3",
        riderStartLongitute: -121.83484174311161,
        riderStartLatitude: 37.312427389433985,
        riderEndLongitute: -120.83484174311161,
        riderEndLatitude: 36.312427389433985,
        rideAccepted: false
    }];

    $scope.update = function () {
        console.log($scope.selection);
        if ($scope.selection == "Available") {
            $scope.makeDriverAvailable();
            repeatUpdate();
        } else {
            $scope.makeDriverUnavailable();
        }

    }
    var repeatUpdate = function () {
        if ($scope.selection == "Available") {
            console.log("Looking for user requests...");
            $scope.getRiderRequest();
            $timeout(repeatUpdate, 5000);
        }
    }

    $scope.makeDriverAvailable = function () {
        var setDriverPos = function (data) {
            var driverPosition = {};
            driverPosition.driverLongitude = data.coords.longitude;
            driverPosition.driverLatitude = data.coords.latitude;
            $rootScope.driverPos = {lat: data.coords.latitude, lng: data.coords.longitude};
            console.log($rootScope.driverPos);
            authentication.makeDriverAvailable(driverPosition).success(function () {
                console.log("You are now available as a driver");
                $scope.hidden = false;
            }).error(function () {
                alert("what");
            });
        }
        if (!navigator.geolocation) {
            output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
            return;
        }
        console.log("NO");
        navigator.geolocation.getCurrentPosition(setDriverPos);
        console.log("YES");
        // Need to get current location of driver 
        //console.log(driverPosition);

    }

    $scope.makeDriverUnavailable = function () {
        authentication.makeDriverUnavailable().success(function () {
            alert("You are no longer available as a driver");
            $scope.hidden = true;
        }).error(function () {

        });
    }

    $scope.getRiderRequest = function () {
        authentication.lookForRiderRequest().success(function (userData) {
            // Populate HTML table with information
            //RAN EVERY 5 SECONDS
            console.log("updated~");
            $scope.data = userData;
        }).error(function () {

        });
    }

    $scope.acceptRiderRequest = function (user) {
        // $rootScope.start = {lat: user.riderStartLatitude, lng: user.riderStartLongitute };
        // $rootScope.end = {lat: user.riderEndLatitude, lng: user.riderEndLongitute }

        // $location.path('/driver');

        //Pass in accepted rider name
        var acceptedRider = {
            riderName : user.riderName, // Change later
            driverLongitude: $rootScope.driverPos.lng,
            driverLatitude:  $rootScope.driverPos.lat

        }
        $rootScope.riderName = acceptedRider.riderName;
        authentication.acceptRiderRequest(acceptedRider).success(function () {
            // Go to next page with the map of route to rider
            $rootScope.start = {lat: user.riderStartLatitude, lng: user.riderStartLongitude};
            $rootScope.end = {lat: user.riderEndLatitude, lng: user.riderEndLongitude};
            console.log($rootScope.start + "start");
            console.log($rootScope.end + "end");
            console.log("testinggggggggg");
            $scope.selection = "Unavailable";
            $location.path('/driver');
        }).error(function () {

        });
    }

    $scope.declineRiderRequest = function (userName) {

        authentication.cancelRiderRequest().success(function () {
            // Remove line from HTML
            var removeRow = function (name) {
                var index = -1;
                var comArr = eval($scope.data);
                for (var i = 0; i < comArr.length; i++) {
                    if (comArr[i].riderName === name) {
                        index = i;
                        break;
                    }
                }
                if (index === -1) {
                    alert("Something gone wrong");
                }
                $scope.data.splice(index, 1);
            };
            removeRow(userName);
        }).error(function () {

        });
    }
});