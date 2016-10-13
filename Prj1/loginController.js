app.controller('loginCtrl', function($scope, $location, $rootScope) {
	$scope.submit = function() {
		if($scope.username == 'admin' && $scope.password == 'admin') { //THIS IS WHERE BACKEND CHECKING REPLACES
			$rootScope.loggedIn = true;
			$location.path('/dashboard');
		} else {
			alert("Username or Password is incorrect");
		};
	};
	$scope.signup = function() {
		$location.path('/signup');	
	}
});