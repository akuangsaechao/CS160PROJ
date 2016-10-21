app.controller('accountCtrl', function($scope, $location, $rootScope) {

	$scope.dash = function() {
		$location.path('/dashboard');	
	};

	$scope.customer = {
        firstName: "Mahesh",
        lastName: "Parashar",
        phone: "111-111-1111",
        password: "admin",
        fees:500,
               
        submit: function() {
        	var customerObject;
        	customerObject = $scope.customer;
            if (customerObject.password != $scope.password) {
				alert("Password is incorrect!");
			} else {
				alert("Your account has been updated!");
				$location.path('/dashboard'); //USE THIS TO UPDATE ACCOUNT INFO
			}
        }
    };
});