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
		.when('/dest', {
				resolve: {
					"check": function($location, $rootScope) {
						if(!$rootScope.loggedIn) {
							$location.path('/');
						}
					}
				},
				templateUrl: 'dest.html'
		})
		.when('/waiting', {
				resolve: {
					"check": function($location, $rootScope) {
						if(!$rootScope.loggedIn) {
							$location.path('/');
						}
					}
				},
				templateUrl: 'waiting.html'
		})
		.when('/driver', {
				resolve: {
					"check": function($location, $rootScope) {
						if(!$rootScope.loggedIn) {
							$location.path('/');
						}
					}
				},
				templateUrl: 'driver.html'
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
