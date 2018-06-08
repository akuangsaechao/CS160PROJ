app.controller('driverDashCtrl', function ($scope, $location, $rootScope) {
    $scope.clockIn = function () {
        $location.path('/manageRequest');
    };
    $scope.history = function () {
        $location.path('/driverHistory');
    }
    $scope.account = function () {
        $location.path('/account');
    }
});