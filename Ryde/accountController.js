app.controller('accountCtrl', function ($scope, $location, $rootScope, authentication) {

    $scope.dash = function () {
        if ($rootScope.loggedIn) {
            $location.path('/dashboard');
        } else {
            $location.path('/driverDash');
        }
    };

    $scope.getAccount = function () {

        authentication.getUserInformation().success(function (data) {
            $scope.customer = {
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phoneNumber,
            }
            //Populate fields in HTML with users current account info
        }).error(function () {

        });
    }

    $scope.submit = function () {
        var userAccount = {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            phoneNumber: $scope.phone,
            creditCard: $scope.creditCard,
            password: $scope.password
        }

        console.log("")
        //THIS ERRORS HELP PLS
        authentication.updateUserInformation(userAccount).success(function () {
            alert("Your account has been updated!");
            if ($scope.loggedIn) {
                $location.path('/dashboard');
            } else {
                $location.path('/driverDash');
            }
        });
        // error(function(){
        // })

    }

    //--- OLD ---
    // $scope.customer = {
    //        firstName: "Mahesh",
    //        lastName: "Parashar",
    //        phone: "111-111-1111",
    //        password: "admin",
    //        fees:500,

    //        submit: function() {
    //        	var customerObject;
    //        	customerObject = $scope.customer;
    //            if (customerObject.password != $scope.password) {
    // 			alert("Password is incorrect!");
    // 		} else {
    // 			alert("Your account has been updated!");
    // 			$location.path('/dashboard'); //USE THIS TO UPDATE ACCOUNT INFO
    // 		}
    //        }
    //    };
});