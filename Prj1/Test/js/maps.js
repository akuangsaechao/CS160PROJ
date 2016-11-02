
//Angular App Module and Controller
var sampleApp = angular.module('mapsApp', []);

sampleApp.controller('MapCtrl', ['$scope',function ($scope) {

    $scope.success = function(position){
        //console.log("in success");

        $scope.markers = [];
        //get current positions
        console.log(position);
        $scope.latitued = position.coords.latitude;
        $scope.longitude = position.coords.longitude;
        console.log("latitude: "+ $scope.latitued + "longitude: " + $scope.longitude );
        //define map option using getCurrent position
        $scope.currentPos =  {lat: $scope.latitued, lng: $scope.longitude };
        var mapOptions = {
            zoom: 16,
            center: $scope.currentPos,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }
        //define google map
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var infoWindow = new google.maps.InfoWindow();

        //set initial marker
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: $scope.currentPos
        });
        //add Event Listener
        google.maps.event.addListener($scope.map, 'click', function (event) {
            var pick_lat = event.latLng.lat();
            var pick_lng = event.latLng.lng();
            $scope.currentPos = {
                lat: pick_lat,
                lng: pick_lng
            };
            marker.setPosition($scope.currentPos);
            console.log($scope.currentPos.lat);
            console.log($scope.currentPos.lng);

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


}]);//controller

function err(){
    //console.log("in error function");
    output.innerHTML = "Unable to retrieve your location";
}