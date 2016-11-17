app.controller('loginCtrl', function($scope, $location, $rootScope, authentication) {
	$scope.submit = function() {
		var user = {
			"username" : $scope.username,
			"password" : $scope.password
		};
		authentication.login(user);
		
		
			$rootScope.loggedIn = true;
			$location.path('/dashboard');
	};
	$scope.signup = function() {
		$location.path('/signup');	
	}
});