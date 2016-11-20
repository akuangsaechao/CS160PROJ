app.controller('confirmCtrl',function ($scope, $location, $rootScope) {
    $scope.dist = "";
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

        riderRequest = {
            riderStartLongitute: $rootScope.currentPos.lng,
            riderStartLatitude: $rootScope.currentPos.lat,
            riderEndLongitute: $rootScope.destPos.lng,
            riderEndLatitude: $rootScope.destPos.lat
        }

        authentication.insertRiderRequest(riderRequest).success(function(){
            $location.path('/waiting');
        });
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

        var marker3 = new google.maps.Marker({
            map: $scope.map,
            position: $rootScope.destPos,
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
        });
        fullBounds.extend( marker3.getPosition() );
        map.fitBounds( fullBounds );
        //Set up driving directions
        directionsDisplay.setMap(map);
        // directionsDisplay.setPanel(document.getElementById('panel'));

        var request = {
            origin: marker.getPosition(),
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


        //GET DISTANCE
        var service = new google.maps.DistanceMatrixService();

        service.getDistanceMatrix(
        {
            origins: [marker.getPosition()],
            destinations: [marker3.getPosition()],
            travelMode: google.maps.TravelMode.DRIVING,
            avoidHighways: false,
            avoidTolls: false
        }, 
        callback
        );

        function callback(response, status) {
            var dist = document.getElementById("dist");
            var price = document.getElementById("price");
            if(status=="OK") {
                dist.value = response.rows[0].elements[0].distance.text;
                price.value = "$" + (Math.floor(((parseInt(dist.value, 10)) / 10) + 1) * 5);
            } else {
                alert("Error: " + status);
            }
        }
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