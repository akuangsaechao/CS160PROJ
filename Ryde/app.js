var app = angular.module('mainApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'login.html'
        })
        .when('/driverDash', {
            resolve: {
                "check": function ($location, $rootScope) {
                    if (!$rootScope.driverIn) {
                        $location.path('/');
                    }
                }
            },
            templateUrl: 'Driver/driverDash.html'
        })
        .when('/manageRequest', {
            resolve: {
                "check": function ($location, $rootScope) {
                    if (!$rootScope.driverIn) {
                        $location.path('/');
                    }
                }
            },
            templateUrl: 'Driver/manageRequest.html'
        })
        .when('/driver', {
            resolve: {
                "check": function ($location, $rootScope) {
                    if (!$rootScope.driverIn) {
                        $location.path('/');
                    }
                }
            },
            templateUrl: 'Driver/driver.html'
        })
        .when('/dashboard', {
            resolve: {
                "check": function ($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
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
                "check": function ($location, $rootScope) {
                    if (!$rootScope.loggedIn && !$rootScope.driverIn) {
                        $location.path('/');
                    }
                }
            },
            templateUrl: 'account.html'
        })
        .when('/request', {
            resolve: {
                "check": function ($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                }
            },
            templateUrl: 'request.html'
        })
        .when('/dest', {
            resolve: {
                "check": function ($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                }
            },
            templateUrl: 'dest.html'
        })
        .when('/confirm', {
            resolve: {
                "check": function ($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                }
            },
            templateUrl: 'confirm.html'
        })
        .when('/pending', {
            resolve: {
                "check": function ($location, $rootScope) {
                    if (!$rootScope.loggedIn && !$rootScope.ready) {
                        $location.path('/');
                    }
                }
            },
            templateUrl: 'pending.html'
        })
        .when('/waiting', {
            resolve: {
                "check": function ($location, $rootScope) {
                    if (!$rootScope.loggedIn) {
                        $location.path('/');
                    }
                }
            },
            templateUrl: 'waiting.html'
        })
        .when('/history', {
            resolve: {
                "check": function ($location, $rootScope) {
                    if (!$rootScope.loggedIn && !$rootScope.driverIn) {
                        $location.path('/');
                    }
                }
            },
            templateUrl: 'history.html'
        })
        .when('/driverHistory', {
            resolve: {
                "check": function ($location, $rootScope) {
                    if (!$rootScope.loggedIn && !$rootScope.driverIn) {
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
