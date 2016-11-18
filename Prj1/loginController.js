app.controller('loginCtrl', function($scope, $location, $rootScope, authentication) {
	$scope.submit = function(){
		$rootScope.username = $scope.username;
		var user = {
			"username" : $scope.username,
			"password" : $scope.password
		};
		//calling serverCaller.js
		 authentication.login(user).success(function(){
			 $rootScope.loggedIn = true;
			 // //link to the dashboard
			 $location.path('/dashboard');
		 });



		/*authentication.login(user).error(function(err){
			console.log("error " + JSON.stringify(err));
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
		});*/

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