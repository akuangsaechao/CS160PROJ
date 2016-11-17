var app = angular.module('mainApp', ['ngRoute']);

app.config(function($routeProvider) {
		$routeProvider
		.when('/', {
				templateUrl: 'login.html'
		})
		.when('/dashboard', {
				resolve: {
					"check": function($location, $rootScope) {
						if(!$rootScope.loggedIn) {
							$location.path('/');
						}
					}
				},
				templateUrl: 'dashboard.html'
		})
		.when('/signup', {
				templateUrl: 'signup.html'
		})
		.otherwise({
				redirectTo: '/'
		});
});
