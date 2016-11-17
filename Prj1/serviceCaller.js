/**
 * Created by kaya on 11/9/16.
 */
//Authentication service call

    app.service('authentication', authentication);

    authentication.$inject = ['$http', '$window', '$httpParamSerializerJQLike', '$rootScope'];
    function authentication ($http, $window, $httpParamSerializerJQLike) {


        var saveToken = function (token) {
            $window.localStorage['mean-token'] = token;
        };

        var getToken = function () {
            return $window.localStorage['mean-token'];
        };

        var isLoggedIn = function() {
            var token = getToken();
            var payload;

            if(token){
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var currentUser = function() {
            if(isLoggedIn()){
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);
                return {
                    email : payload.email,
                    name : payload.name
                };
            }
        };

        register = function(user) {
            return $http({
                method: 'POST',
                url: "http://localhost:3000/api/register",
                data: $httpParamSerializerJQLike(user),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(data){
                console.log("Register Success");
                saveToken(data.token);
            });
        };



        login = function(user) {
            return $http({
               method: 'POST',
                url: "http://localhost:3000/api/login",
                data: $httpParamSerializerJQLike(user),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data) {
                console.log("Login Success");
                saveToken(data.token);
            });


            /*return $http.post('/api/login', user).success(function(data) {
                saveToken(data.token);
            });*/
        };

        logout = function() {
            $window.localStorage.removeItem('mean-token');
        };
        profile = function(user) {
            
            return $http({
                method: 'POST',
                url: "http://localhost:3000/api/profile",
                data: $httpParamSerializerJQLike(user),
                headers:{'Content-Type' : 'application/x-www-form-urlencoded'},
                

            }).success(function(data){
                saveToken(data.token);

            });
        };
        availableDriver = function(user) {
            return $http({
                method: 'POST',
                url: "http://localhost:3000/api/availableDriver",
                data: $httpParamSerializerJQLike(user),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                //data for finding available Driver
                username: user.username,
                driverLatitude: user.latitude,
                driverLongitude: user.longitude
            }).success(function(data){
                console.log("available driver");
            });//http
        };//available driver
        riderRequest = function(requestInfo){
           /* var request = {
                //data for reid-request
                riderName: requestInfo.username,
                riderStartLatitude: requestInfo.startLat,
                riderStartLongitude: requestInfo.startLng.lng,
                riderEndLatitude: requestInfo.riderEndLatitude,
                riderEndLongitude: $rootScope.destPos.lng
            };*/
            console.log("request Info" + JSON.stringify(requestInfo));
            return $http({
                method: "POST", 
                url: "http://localhost:3000/api/driver",
                data: $httpParamSerializerJQLike(requestInfo),
                headers: {'Content-Type' : 'application/x-www-form-urlencoded'}
            }).success(function(data){
                console.log("SUCCESS in rider request");
                console.log(JSON.stringify(data));
            }).error(function(data){
                console.log("BAD request");
            });//$http
            
        }


        return {
            currentUser : currentUser,
            saveToken : saveToken,
            getToken : getToken,
            isLoggedIn : isLoggedIn,
            register : register,
            login : login,
            logout : logout,
            availableDriver: availableDriver,
            riderRequest: riderRequest
        };
        
        
               
               
                
        
    }//authentication


