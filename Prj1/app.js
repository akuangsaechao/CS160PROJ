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
		.when('/account', {
				resolve: {
					"check": function($location, $rootScope) {
						if(!$rootScope.loggedIn) {
							$location.path('/');
						}
					}
				},
				templateUrl: 'account.html'
		})
		.when('/request', {
				resolve: {
					"check": function($location, $rootScope) {
						if(!$rootScope.loggedIn) {
							$location.path('/');
						}
					}
				},
				templateUrl: 'request.html'
		})
		.when('/history', {
				resolve: {
					"check": function($location, $rootScope) {
						if(!$rootScope.loggedIn) {
							$location.path('/');
						}
					}
				},
				templateUrl: 'history.html'
			})
		.otherwise({
				redirectTo: '/'
		});
});
