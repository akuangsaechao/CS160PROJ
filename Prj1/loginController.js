app.controller('loginCtrl', function($scope, $location, $rootScope, authentication) {
	$scope.submit = function() {
		var user = {
			"username" : $scope.username,
			"password" : $scope.password
		};
		authentication.login(user).then(
			if($rootScope.driverStatus === true){
				$rootScope.loggedIn = true;
				$location.path('/dashboard');
			} else {
				$rootScope.driverIn = true;
				$location.path('/driverDash');
			}

		);

	};
	$scope.signup = function() {
		$location.path('/signup');	
	}
});