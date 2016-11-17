app.controller('loginCtrl', function($scope, $location, $rootScope, authentication) {
	$scope.submit = function() {
		$rootScope.username = $scope.username;
		var user = {
			"username" : $scope.username,
			"password" : $scope.password
		};
		//calling serverCaller.js
		authentication.login(user);
		
		$rootScope.loggedIn = true;
		//link to the dashboard
		$location.path('/dashboard');
	};
	$scope.signup = function() {
		$location.path('/signup');	
	}
});