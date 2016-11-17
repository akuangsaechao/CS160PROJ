app.controller('signupCtrl', function($scope, $location, $rootScope) {
	$scope.submit = function() {
		if ($scope.password != $scope.password2) {
			alert("Passwords do not match!");
		}else if(true) { //THIS IS WHERE CHECK IF ACCOUNT EXISTS
			$rootScope.loggedIn = true;
			alert("Thank you for signing up!");
			$location.path('/dashboard');
		} else {
			alert("An account with the username already exists, please enter a different username");
		};
	};
});