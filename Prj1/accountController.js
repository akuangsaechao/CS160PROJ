app.controller('accountCtrl', function($scope, $location, $rootScope, authentication) {

	$scope.dash = function() {
		$location.path('/dashboard');	
	};

    $scope.getAccount = function(){
        authentication.getUserInformation().success(function(){
            //Populate fields in HTML with users current account info
        }).error(function(){
            
        });
    }

    $scope.submit = function(){
        var userAccount = {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            phoneNumber: $scope.phoneNumber,
            creditCard: $scope.creditCard,
            password: $scope.password
        }

        authentication.updateUserInformation().success(function(){
            alert("Your account has been updated!");
            $location.path('/dashboard'); //USE THIS TO UPDATE ACCOUNT INFO
        })error(function(){

        });
    }

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