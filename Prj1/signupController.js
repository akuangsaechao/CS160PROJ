app.controller('signupCtrl', function($scope, $location, $rootScope, authentication) {
	$scope.submit = function() {
		if ($scope.password != $scope.password2) {
			alert("Passwords do not match!");
		}else if(true) { //THIS IS WHERE CHECK IF ACCOUNT EXISTS
			var user = {
				"username" : $scope.username,
				"firstName": $scope.firstname,
				"lastName" : $scope.lastname,
				"phoneNumber":$scope.phone,
				"creditCard": $scope.credit,
				"driverStatus": $scope.driverStatus,
				"password" : $scope.password
				};
			console.log(user);
			authentication.register(user).error(function(err){
			console.log("error");
			alert("Username already exists");
		}).then(function(){
			if($scope.driverStatus === true){
				$rootScope.driverIn = true;
				$location.path('/driverDash');
				console.log("driver Status true");
			} else {
				$rootScope.loggedIn = true;
				$location.path('/dashboard');
				console.log("driver Status not true");
			}
		});
		} else {
			alert("An account with the username already exists, please enter a different username");
		};
	};
});