app.controller('historyCtrl', function ($scope, $location, $rootScope, authentication) {
    var user = [{}];
    $scope.request = function () {
        $location.path('/request');
    };
    $scope.dash = function () {
        if ($rootScope.driverIn) {
            $location.path('/driverDash');
        } else {
            $location.path('/dashboard');
        }
    }
    $scope.account = function () {
        $location.path('/account');
    }

    $scope.getUserAccount = function () {
        if ($rootScope.driverIn) {
            authentication.getDriverHistory().success(function (data) {
                user = data;
                //Populate HTML with information
            }).error(function () {
                alert("Something went wrong, please alert your site admin.")
            });
        } else {
            authentication.getRiderHistory().success(function (data) {
                user = data;
                //Populate HTML with information
            }).error(function () {
                alert("Something went wrong, please alert your site admin.")
            });
        }
    }

    $scope.getName = function () {
        /*
        if (!user) {

        } else if ($rootScope.LoggedIn) {
            return user[0].riderName;
        } else {
            return user[0].driverName;
        }
        */
        if (!user) {

        } else {
            console.log(user[0]);
            if ( user[0].riderName != null)
                return user[0].riderName;
            else
                return user[0].driverName;               
        }
    }

    $scope.getUserAccount();
});