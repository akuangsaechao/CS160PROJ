app.controller('loginCtrl', function ($scope, $location, $rootScope, authentication) {
    //THIS IS RUN ON LOGIN SUBMISSION
    $scope.submit = function () {
        $rootScope.username = $scope.username;
        var user = {
            "username": $scope.username,
            "password": $scope.password
        };


        //USER AUTENTICATION, JSON "USER" GOES TO BACKEND, BACKEND GIVES BACK USER JSON IF PASS, ERROR IF FAIL.
        //DRIVER GOES TO DRIVER PAGE, USER GOES TO USER PAGE.
        authentication.login(user).error(function (err) {
            console.log("error " + JSON.stringify(err));
            alert("Username or Password is incorrect");
        }).then(function () {
            if ($rootScope.driverStatus === true) {
                $rootScope.driverIn = true;
                $location.path('/driverDash');
            } else {
                $rootScope.loggedIn = true;
                $location.path('/dashboard');
            }
        });

    };
    $scope.signup = function () {
        $location.path('/signup');
    }
});