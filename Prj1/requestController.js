app.controller('requestCtrl',function ($scope, $location, $rootScope) {

    // $scope.driver = function() {
    //     $location.path('/driver');  
    // }
    $scope.return = function() {
        $location.path('/dashboard');  
    }
    $scope.submit = function() {
        console.log("username: " + $rootScope.username);
        console.log("startLng: " + $scope.currentPos.lng);
        console.log("startLat: " + $scope.currentPos.lat );
        //authenticate.riderRequest();
        var requestData = {
            username: $scope.username,
            startLng: $scope.currentPos.lng,
            startLat: $scope.currentPos.lat
        };
        $location.path('/dest').search(requestData);
    };

    $scope.success = function(position){
        //console.log("in success");

        $scope.markers = [];
        //get current positions
        console.log(position);
        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;
        console.log("latitude: "+ $scope.latitude + "longitude: " + $scope.longitude );
        //define map option using getCurrent position
        $rootScope.currentPos =  {lat: $scope.latitude, lng: $scope.longitude };
        var mapOptions = {
            zoom: 16,
            center: $rootScope.currentPos,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }
        //define google map
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var infoWindow = new google.maps.InfoWindow();

        //set initial marker
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: $rootScope.currentPos
        });
        //add Event Listener
        google.maps.event.addListener($scope.map, 'click', function (event) {
            var pick_lat = event.latLng.lat();
            var pick_lng = event.latLng.lng();
            $rootScope.currentPos = {
                lat: pick_lat,
                lng: pick_lng
            };
            marker.setPosition($rootScope.currentPos);
            console.log($rootScope.currentPos.lat);
            console.log($rootScope.currentPos.lng);

        });


        //Search Box
        $scope.markers = [];
    var infoWindow = new google.maps.InfoWindow();

    //init autocomplete
    var input = document.getElementById('pac-input');
    $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var autocomplete = new google.maps.places.Autocomplete(input);
    //autocomplete.bindTo('bounds', $scope.map);
    autocomplete.addListener('place_changed', function () {
        setPlace();
    });


    var setPlace = function () {
        //infoWindow.close();
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            $scope.map.fitBounds(place.geometry.viewport);
        } else {
            $scope.map.setCenter(place.geometry.location);
        }

        createMarker({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), address: place.formatted_address });
    }


    var createMarker = function (info) {
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.lng),
            title: info.address
        });
        marker.content = '<div class="infoWindowContent">' + info.address + '</div>';

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        $scope.markers.push(marker);
        $rootScope.currentPos = marker.position;
    }



        $(window).resize(function() {
        // (the 'map' here is the result of the created 'var map = ...' above)
            google.maps.event.trigger($scope.map, "resize");
        });

        $scope.openInfoWindow = function(e, selectedMarker){
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }//openInfoWindow


    }//success
    //console.log("in controller");
    if (!navigator.geolocation){
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }//if
    //console.log("before calling get Current position")

    navigator.geolocation.getCurrentPosition($scope.success);



});//controller

function err(){
    //console.log("in error function");
    output.innerHTML = "Unable to retrieve your location";
}