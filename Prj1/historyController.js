app.controller('historyCtrl', function($scope, $location, $rootScope, authentication) {
	$scope.request = function() {
		$location.path('/request');
	};
	$scope.dash = function() {
		$location.path('/dashboard');	
	}
	$scope.account = function() {
		$location.path('/account');
	}

   $scope.getUserAccount = function(){
      if ($rootScope.driverStatus === true){
         authentication.getDriverHistory().success(function(){
            //Populate HTML with information
         }).error(function(){

         });
      } else {
         authentication.getRiderHistory().success(function(){
            //Populate HTML with information
         }).error(function(){
            
         });
      }
   }
	$scope.customer = {
               firstName: "Mahesh",
               lastName: "Parashar",
               fees:500,
               
               history:[
                  {name:'Bob',Cost:70, Day: "10/22/15"},
                  {name:'Jim',Cost:80, Day: "10/22/15"},
                  {name:'Bob',Cost:65, Day: "10/22/15"},
                  {name:'Dan',Cost:75, Day: "10/22/15"},
                  {name:'Jim',Cost:67, Day: "10/22/15"}
               ],
               
               fullName: function() {
                  var studentObject;
                  studentObject = $scope.customer;
                  return studentObject.firstName + " " + studentObject.lastName;
               }
            };
});