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
				"driverStatus": true,
				"password" : $scope.password
				};
			console.log(user);
			//calling serviceCaller.js
			authentication.register(user);
			$rootScope.loggedIn = true;
			alert("Thank you for signing up!");
			$location.path('/dashboard');
		} else {
			alert("An account with the username already exists, please enter a different username");
		};
	};
});