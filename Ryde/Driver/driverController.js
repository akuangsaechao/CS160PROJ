app.controller('driverCtrl', function ($scope, $location, $rootScope, $timeout, authentication) {
    $rootScope.alert = true;
    $scope.return = function () {
        var rightNow = new Date();
        var res = rightNow.toISOString().slice(0,10).replace(/-/g,"");

        var stuff = {
            dateOfRide: res,
            riderName: $rootScope.riderName
        }
        authentication.completeRiderRequest(stuff).success(function(){
            $rootScope.alert = false;
            $location.path('/driverDash');
        });

    }

    $scope.success = function () {
        var updatePos = function () {
            var updateLocation = function (data) {
                console.log("updated");
                var currentPos = {lat: data.coords.latitude, lng: data.coords.longitude};
                marker2.setPosition(currentPos);
                //--- RUN THE UPLOAD POSITION FUNCTION FOR THE USER ---
                var dataNew = {
                    riderName: $rootScope.riderName,
                    driverLatitude: currentPos.lat,
                    driverLongitude: currentPos.lng
                }
                authentication.updateRequestDriverLocation(dataNew).success(function () { 
                });
            }
            if (!navigator.geolocation) {
                output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
                return;
            }
            navigator.geolocation.getCurrentPosition(updateLocation);
            $timeout(updatePos, 1000);
        }

        //console.log("in success");
        var fullBounds = new google.maps.LatLngBounds();
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        $scope.markers = [];
        var mapOptions = {
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        //define google map
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        // console.log(drivers);
        var map = $scope.map;

        var infoWindow = new google.maps.InfoWindow();


        console.log($rootScope.driverPos);
        console.log($rootScope.end);
        console.log($rootScope.start);
        //set Customer marker
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: $rootScope.start
            //position: {lat: rootScope.lat, lng: rootScope.long }
        });
        fullBounds.extend(marker.getPosition());
        //Set Driver Marker
        var marker2 = new google.maps.Marker({
            map: $scope.map,
            position: $rootScope.driverPos,
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        });
        fullBounds.extend(marker2.getPosition());
        map.fitBounds(fullBounds);

        var marker3 = new google.maps.Marker({
            map: $scope.map,
            position: $rootScope.end,
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
        });
        fullBounds.extend(marker3.getPosition());
        map.fitBounds(fullBounds);
        //Set up driving directions
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById('panel'));

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
        });
        $scope.openInfoWindow = function (e, selectedMarker) {
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }

        $(window).resize(function () {
            // (the 'map' here is the result of the created 'var map = ...' above)
            google.maps.event.trigger(map, "resize");
        });

        //START UPDATING THE POSITION EVERY SECOND
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