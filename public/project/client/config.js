/**
 * Created by rahulk on 2/22/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .config(function($routeProvider)
        {
            $routeProvider
                .when('/',
                    {
                        templateUrl: 'views/home/home.view.html',
                        controller: 'HomeController'
                    })
                .when('/login',
                    {
                        templateUrl: 'views/users/login.view.html',
                        controller: 'LoginController'
                    })
                .when('/register',
                    {
                        templateUrl: 'views/users/register.view.html',
                        controller: 'RegisterController'
                    })
                .when('/profile',
                    {
                        templateUrl: 'views/users/profile.view.html',
                        controller: 'ProfileController',
                        resolve: {
                            loggedin: checkLoggedin
                        }
                    })
                .when('/admin',
                    {
                        templateUrl: 'views/admin/admin.user.view.html',
                        controller: 'AdminUserController',
                        resolve: {
                            loggedin: checkAdmin
                        }
                    })
                .when('/admin/user',
                    {
                        templateUrl: 'views/admin/admin.user.view.html',
                        controller: 'AdminUserController',
                        resolve: {
                            loggedin: checkAdmin
                        }
                    })
                .when('/admin/hike',
                    {
                        templateUrl: 'views/admin/admin.hike.view.html',
                        controller: 'AdminHikeController',
                        resolve: {
                            loggedin: checkAdmin
                        }
                    })
                .when('/hikes',
                    {
                        templateUrl: 'views/hikes/hikes.view.html',
                        controller: 'HikesController',
                    })
                .when('/hike/:hikeId',
                    {
                        templateUrl: 'views/hikes/hike.view.html',
                        controller: 'HikeController'
                    })
                .when('/events',
                    {
                        templateUrl: 'views/events/events.view.html',
                        controller: 'EventsController',
                        resolve: {
                            loggedin: checkLoggedin
                        }
                    })
                .when('/event/:eventId',
                    {
                        templateUrl: 'views/events/event.view.html',
                        controller: 'EventController',
                        resolve: {
                            loggedin: checkLoggedin
                        }
                    })
                .when('/users',
                    {
                        templateUrl: 'views/users/users.view.html',
                        controller: 'UsersController',
                        resolve: {
                            loggedin: checkLoggedin
                        }
                    });
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope, MsgBusService)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') !== -1)
            {
                $rootScope.user = user;
                MsgBusService.emitMsg('login');
                deferred.resolve();
            }
            // User is Not Authenticated
            else if (user === '0')
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, MsgBusService)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
                MsgBusService.emitMsg('login');
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope, MsgBusService)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.user = user;
                MsgBusService.emitMsg('login');
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();
