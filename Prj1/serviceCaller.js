/**
 * Created by kaya on 11/9/16.
 */
//Authentication service call

    app.service('authentication', authentication);

    //what authentication needs:
    authentication.$inject = ['$http', '$window', '$httpParamSerializerJQLike', '$rootScope'];
    function authentication ($http, $window, $httpParamSerializerJQLike, $rootScope) {


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
            }).success(function(data){
                console.log("Register Success");
                saveToken(data.token);
                $rootScope.driverStatus = data.driverStatus;
            }).error(function (err) {
                console.log(err);
            });
            // .then(
            //     function success(data) {
            //     console.log("Login Success");
            //     saveToken(data.token);
            //     $rootScope.driverStatus = data.driverStatus;
            //     }, function error(response){


            // });
        };

        logout = function() {
            $window.localStorage.removeItem('mean-token');
        };

        getUserInformation = function(requestInfo){
            return $http({
                method: "GET", 
                url: "http://localhost:3000/api/profile",
                data: $httpParamSerializerJQLike(requestInfo),
                headers: {'Content-Type' : 'application/x-www-form-urlencoded',
                           Authorization : 'Bearer ' + getToken()}
            });
        }

        updateUserInformation = function(requestInfo){
            return $http({
                method: "PUT", 
                url: "http://localhost:3000/api/profile",
                data: $httpParamSerializerJQLike(requestInfo),
                headers: {'Content-Type' : 'application/x-www-form-urlencoded',
                           Authorization : 'Bearer ' + getToken()}
            });
        }


        getDriverHistory = function(requestInfo){
            return $http({
                method: "GET", 
                url: "http://localhost:3000/api/driverHistory",
                data: $httpParamSerializerJQLike(requestInfo),
                headers: {'Content-Type' : 'application/x-www-form-urlencoded',
                           Authorization : 'Bearer ' + getToken()}
            });
        }

        getRiderHistory = function(requestInfo){
            return $http({
                method: "GET", 
                url: "http://localhost:3000/api/riderHistory",
                data: $httpParamSerializerJQLike(requestInfo),
                headers: {'Content-Type' : 'application/x-www-form-urlencoded',
                           Authorization : 'Bearer ' + getToken()}
            });
        }

        makeDriverAvailable = function(driverPosition) {
            return $http({
                method: 'POST',
                url: "http://localhost:3000/api/available",
                data: $httpParamSerializerJQLike(driverPosition),
                headers: {'Content-Type' : 'application/x-www-form-urlencoded',
                           Authorization : 'Bearer ' + getToken()}
            }).success(function(data){

            });
        };

        makeDriverUnavailable = function() {
            return $http({
                method: 'DELETE',
                url: "http://localhost:3000/api/unavailable",
                headers: {'Content-Type' : 'application/x-www-form-urlencoded',
                           Authorization : 'Bearer ' + getToken()}
            }).success(function(data){

            });
        };

        updateDriverLocation = function(driverPosition) {
            //connection to  availableDriverController.js
            //required Data
            //data for finding available Driver
            //username: user.username,
            //driverLatitude: user.latitude,
            //driverLongitude: user.longitude
            return $http({
                method: 'PUT',
                url: "http://localhost:3000/api/driver",
                data: $httpParamSerializerJQLike(driverPosition),
                headers: {'Content-Type' : 'application/x-www-form-urlencoded',
                           Authorization : 'Bearer ' + getToken()}
            }).success(function(data){
 
             });
        };


        insertRiderRequest = function(requestInfo){
            return $http({
                method: "POST", 
                url: "http://localhost:3000/api/request",
                data: $httpParamSerializerJQLike(requestInfo),
                headers: {'Content-Type' : 'application/x-www-form-urlencoded',
                           Authorization : 'Bearer ' + getToken()}
            });
            
        }

        lookForRiderRequest = function(requestInfo){
            return $http({
                method: "GET", 
                url: "http://localhost:3000/api/request",
                data: $httpParamSerializerJQLike(requestInfo),
                headers: {'Content-Type' : 'application/x-www-form-urlencoded',
                           Authorization : 'Bearer ' + getToken()}
            });
            
        }

        checkForAcceptedRequest = function(requestInfo){
            return $http({
                method: "GET", 
                url: "http://localhost:3000/api/request",
                data: $httpParamSerializerJQLike(requestInfo),
                headers: {'Content-Type' : 'application/x-www-form-urlencoded',
                           Authorization : 'Bearer ' + getToken()}
            });
            
        }

        acceptRiderRequest = function(requestInfo){
            return $http({
                method: "PUT", 
                url: "http://localhost:3000/api/request",
                data: $httpParamSerializerJQLike(requestInfo),
                headers: {'Content-Type' : 'application/x-www-form-urlencoded',
                           Authorization : 'Bearer ' + getToken()}
            });
            
        }

        cancelRiderRequest = function(requestInfo){
            return $http({
                method: "DELETE", 
                url: "http://localhost:3000/api/request",
                data: $httpParamSerializerJQLike(requestInfo),
                headers: {'Content-Type' : 'application/x-www-form-urlencoded',
                           Authorization : 'Bearer ' + getToken()}
            });
            
        }

        completeRiderRequest = function(requestInfo){
            return $http({
                method: "DELETE", 
                url: "http://localhost:3000/api/request",
                data: $httpParamSerializerJQLike(requestInfo),
                headers: {'Content-Type' : 'application/x-www-form-urlencoded',
                           Authorization : 'Bearer ' + getToken()}
            });
            
        }


        return {
            saveToken : saveToken,
            getToken : getToken,
            isLoggedIn : isLoggedIn,
            currentUser : currentUser,

            logout : logout,

            register : register,
            login : login,

            getUserInformation: getUserInformation,
            updateUserInformation: updateUserInformation,

            getDriverHistory: getDriverHistory,
            getRiderHistory: getRiderHistory,

            makeDriverAvailable: makeDriverAvailable,
            makeDriverUnavailable: makeDriverUnavailable,
            updateDriverLocation: updateDriverLocation,

            insertRiderRequest: insertRiderRequest,
            lookForRiderRequest: lookForRiderRequest,
            checkForAcceptedRequest: checkForAcceptedRequest,
            acceptRiderRequest: acceptRiderRequest,
            cancelRiderRequest: cancelRiderRequest,
            completeRiderRequest: completeRiderRequest
        };
        
        
               
               
                
        
    }//authentication


