app.controller('dashCtrl', function ($scope, $location, $rootScope) {
    $scope.request = function () {
        $location.path('/request');
    };
    $scope.history = function () {
        $location.path('/history');
    }
    $scope.account = function () {
        $location.path('/account');
    }
});