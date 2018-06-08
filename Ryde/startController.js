app.controller('NavBarCtrl', function ($scope, $location, $rootScope) {

    $scope.isCollapsed = true;

    $scope.userDash = function () {
        $location.path('/dashboard');
    }
    $scope.driverDash = function () {
        $location.path('/driverDash');
    }
    $scope.account = function () {
        $location.path('/account');
    }
    $scope.request = function () {
        $location.path('/request');
    }
    $scope.history = function () {
        $location.path('/history');
    }
    $scope.clockIn = function () {
        $location.path('/manageRequest');
    };

    var verify = function () {
        if ($rootScope.alert) {
            alert("");
        }
    }

    //CLEARS LOGIN FLAGS WHEN USER LOGS OUT THEN REDIRECTS TO LOGIN PAGE
    $scope.logout = function () {
        $rootScope.loggedIn = false;
        $rootScope.driverIn = false;
        $location.path('/');
    };
});