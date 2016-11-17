app.controller('loginCtrl', function($scope, $location, $rootScope, authentication) {
	$scope.submit = function() {
		var user = {
			"username" : $scope.username,
			"password" : $scope.password
		};
		authentication.login(user).error(function(err){
			console.log("error");
			alert("Username or Password is incorrect");
		}).then(function(){
			if($rootScope.driverStatus === true){
				$rootScope.driverIn = true;
				$location.path('/driverDash');
				console.log("driver Status true");
			} else {
				$rootScope.loggedIn = true;
				$location.path('/dashboard');
				console.log("driver Status not true");
			}
		});

	};
	// then(function(){
	// 		if($rootScope.driverStatus === true){
	// 			$rootScope.loggedIn = true;
	// 			$location.path('/dashboard');
	// 		} else {
	// 			$rootScope.driverIn = true;
	// 			$location.path('/driverDash');
	// 		}

	// 	});
	$scope.signup = function() {
		$location.path('/signup');	
	}
});