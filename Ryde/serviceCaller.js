/**
 * Created by kaya on 11/9/16.
 */
//Authentication service call

app.service('authentication', authentication);

//what authentication needs:
authentication.$inject = ['$http', '$window', '$httpParamSerializerJQLike', '$rootScope'];
function authentication($http, $window, $httpParamSerializerJQLike, $rootScope) {


    var saveToken = function (token) {
        $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
        return $window.localStorage['mean-token'];
    };

    var isLoggedIn = function () {
        var token = getToken();
        var payload;

        if (token) {
            payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            return payload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    };

    var currentUser = function () {
        if (isLoggedIn()) {
            var token = getToken();
            var payload = token.split('.')[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);
            return {
                email: payload.email,
                name: payload.name
            };
        }
    };

    register = function (user) {
        return $http({
            method: 'POST',
            url: "http://localhost:3000/api/register",
            data: $httpParamSerializerJQLike(user),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
            console.log("Register Success");
            saveToken(data.token);
        });
    };


    login = function (user) {
        return $http({
            method: 'POST',
            url: "http://localhost:3000/api/login",
            data: $httpParamSerializerJQLike(user),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data) {
            console.log("Register Success");
            saveToken(data.token);
            $rootScope.driverStatus = data.driverStatus;
        }).error(function (err) {
            console.log(err);
        });
    };

    logout = function () {
        $window.localStorage.removeItem('mean-token');
    };

    getUserInformation = function (requestInfo) {
        return $http({
            method: "GET",
            url: "http://localhost:3000/api/profile",
            // data: $httpParamSerializerJQLike(requestInfo),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getToken()
            }
        }).success(function (data) {
            return data;
        });
    };

    updateUserInformation = function (requestInfo) {
        return $http({
            method: "PUT",
            url: "http://localhost:3000/api/profile",
            data: $httpParamSerializerJQLike(requestInfo),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getToken()
            }
        }).success(function (data) {
            saveToken(data.token);
        }).error(function (err) {
            console.log(err);
        });
    };


    getDriverHistory = function () {
        return $http({
            method: "GET",
            url: "http://localhost:3000/api/driverHistory",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getToken()
            }
        }).success(function (data) {
            return data;
        });
    };

    getRiderHistory = function () {
        return $http({
            method: "GET",
            url: "http://localhost:3000/api/riderHistory",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getToken()
            }
        }).success(function (data) {
            return data;
        });
    };

    makeDriverAvailable = function (driverPosition) {
        return $http({
            method: 'PUT',
            url: "http://localhost:3000/api/available",
            data: $httpParamSerializerJQLike(driverPosition),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getToken()
            }
        });
    };

    makeDriverUnavailable = function () {
        return $http({
            method: 'PUT',
            url: "http://localhost:3000/api/unavailable",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getToken()
            }
        });
    };

    updateDriverLocation = function (driverPosition) {
        return $http({
            method: 'PUT',
            url: "http://localhost:3000/api/driver",
            data: $httpParamSerializerJQLike(driverPosition),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getToken()
            }
        });
    };


    insertRiderRequest = function (requestInfo) {
        return $http({
            method: "POST",
            url: "http://localhost:3000/api/request",
            data: $httpParamSerializerJQLike(requestInfo),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getToken()
            }
        });

    };

    lookForRiderRequest = function () {
        return $http({
            method: "GET",
            url: "http://localhost:3000/api/request",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getToken()
            }
        });

    };

    checkForAcceptedRequest = function () {
        return $http({
            method: "GET",
            url: "http://localhost:3000/api/accepted",
            // data: $httpParamSerializerJQLike(requestInfo),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getToken()
            }
        }).success(function (data) {
            return data;
        });
    };

    acceptRiderRequest = function (requestInfo) {
        return $http({
            method: "PUT",
            url: "http://localhost:3000/api/request",
            data: $httpParamSerializerJQLike(requestInfo),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getToken()
            }
        });

    };

    cancelRiderRequest = function (requestInfo) {
        return $http({
            method: "DELETE",
            url: "http://localhost:3000/api/cancel",
            data: $httpParamSerializerJQLike(requestInfo),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getToken()
            }
        });

    };

    completeRiderRequest = function (requestInfo) {
        return $http({
            method: "DELETE",
            url: "http://localhost:3000/api/request",
            data: $httpParamSerializerJQLike(requestInfo),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getToken()
            }
        });

    };

    updateRequestDriverLocation = function (driverPosition) {
        return $http({
            method: 'PUT',
            url: "http://localhost:3000/api/location",
            data: $httpParamSerializerJQLike(driverPosition),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + getToken()
            }
        });
    };


    return {
        saveToken: saveToken,
        getToken: getToken,
        isLoggedIn: isLoggedIn,
        currentUser: currentUser,

        logout: logout,

        register: register,
        login: login,

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
        completeRiderRequest: completeRiderRequest,
        updateRequestDriverLocation: updateRequestDriverLocation
    };


}//authentication


