app.controller('NavBarCtrl', function($scope, $location, $rootScope) {

	$scope.isCollapsed = true;

    $scope.logout = function() {
        $rootScope.loggedIn = false;
        $rootScope.driverIn = false;
        $location.path('/');   
    };
});