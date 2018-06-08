app.controller('waitingCtrl', function ($scope, $location, $rootScope, $timeout, authentication) {
    var repeat = true;
    $rootScope.alert = true;

    var drivers = [
    {
        city: 'Driver was here!',
        desc: 'Test',
        lat: 37.312427389433985,
        long: -121.83484174311161
    }
    ];

    $scope.return = function () {
        repeat = false;
        $rootScope.alert = false;
        $location.path('/dashboard');
    }

    $scope.success = function () {
        var updatePos = function () {
            var updateLocation = function (data) {
                console.log("updated");
                var currentPos = {lat: data.driverLatitude, lng: data.driverLongitude};
                marker2.setPosition(currentPos);
            }
            //--- CALL SERVICECALL TO GET DRIVER POSITION. IN SUCCESS RESPONSE, RUN updatePos(OUTPUT) TO UPDATE MAP LOCATION. ---
            authentication.checkForAcceptedRequest().success(function (data) {
                updateLocation(data);
            }).error(function () {
                $scope.return();
            });
            if (repeat){
               $timeout(updatePos, 1000); 
            }
            
        }
        //console.log("in success");
        var fullBounds = new google.maps.LatLngBounds();
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        $scope.markers = [];
        //get current positions

        var mapOptions = {
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        //define google map
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        console.log(drivers);
        var map = $scope.map;

        var infoWindow = new google.maps.InfoWindow();

        //set Customer marker
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: $rootScope.currentPos
        });

        console.log($rootScope.currentPos);

        fullBounds.extend(marker.getPosition());
        //Set Driver Marker
        //REPLACE THIS WITH REAL DRIVER LOCATION. THIS IS TEMPORARY. DONT FORGET THIS ALVYN. 11/19/16
        var marker2 = new google.maps.Marker({
            map: $scope.map,
            position: $rootScope.driverCurrentPos,
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        });

        console.log($rootScope.driverCurrentPos);

        fullBounds.extend(marker2.getPosition());
        map.fitBounds(fullBounds);
        //Set destination Marker
        var marker3 = new google.maps.Marker({
            map: $scope.map,
            position: $rootScope.destPos,
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
        });

        console.log($rootScope.destPos);


        fullBounds.extend(marker3.getPosition());
        map.fitBounds(fullBounds);
        directionsDisplay.setMap(map);


        var waypts = [];
        waypts.push({
            location: marker.position,
            stopover: true
        });

        var request = {
            origin: marker2.getPosition(),
            waypoints: waypts,
            destination: marker3.getPosition(),
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        })
        $scope.openInfoWindow = function (e, selectedMarker) {
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }//openInfoWindow

        $(window).resize(function () {
            // (the 'map' here is the result of the created 'var map = ...' above)
            google.maps.event.trigger(map, "resize");
        });
        updatePos();
    }//success
    //console.log("in controller");
    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }//if
    //console.log("before calling get Current position")

    $scope.success();


});//controller

function err() {
    //console.log("in error function");
    output.innerHTML = "Unable to retrieve your location";
}