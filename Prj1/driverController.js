app.controller('driverCtrl',function ($scope, $location, $rootScope) {

    var drivers = [
        {
            city : 'Driver was here!',
            desc : 'Test',
            lat : 37.312427389433985,
            long : -121.83484174311161 
        }
    ];

    $scope.return = function() {
        $location.path('/dashboard');  
    }
    $scope.submit = function() {
        $location.path('/waiting');
    }

    $scope.success = function(){
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
        console.log(drivers);
        var map = $scope.map;

        var infoWindow = new google.maps.InfoWindow();

        //set Customer marker
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: $rootScope.currentPos
            //position: {lat: rootScope.lat, lng: rootScope.long }
        });
        fullBounds.extend( marker.getPosition() );
        //Set Driver Marker
        var marker2 = new google.maps.Marker({
            map: $scope.map,
            position: {lat: drivers[0].lat, lng: drivers[0].long },
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        });
        fullBounds.extend( marker2.getPosition() );
        map.fitBounds( fullBounds );

        var marker3 = new google.maps.Marker({
            map: $scope.map,
            position: $rootScope.destPos,
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
        });
        fullBounds.extend( marker3.getPosition() );
        map.fitBounds( fullBounds );
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
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }

        $(window).resize(function() {
        // (the 'map' here is the result of the created 'var map = ...' above)
            google.maps.event.trigger(map, "resize");
        });
    }//success
    //console.log("in controller");
    if (!navigator.geolocation){
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }//if
    //console.log("before calling get Current position")
        $scope.success();




});//controller

function err(){
    //console.log("in error function");
    output.innerHTML = "Unable to retrieve your location";
}