/**
 * Created by kaya on 11/9/16.
 */
//Authentication service call

    app.service('authentication', authentication);

    authentication.$inject = ['$http', '$window', '$httpParamSerializerJQLike'];
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
                saveToken(data.token);
            });
        };



        login = function(user) {
            return $http.post('/api/login', user).success(function(data) {
                saveToken(data.token);
            });
        };

        logout = function() {
            $window.localStorage.removeItem('mean-token');
        };

        return {
            currentUser : currentUser,
            saveToken : saveToken,
            getToken : getToken,
            isLoggedIn : isLoggedIn,
            register : register,
            login : login,
            logout : logout
        };
    }//authentication


