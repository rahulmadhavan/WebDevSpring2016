/**
 * Created by rahulk on 2/22/16.
 */
(function() {
    'use strict';

    angular
        .module('FormBuilderApp')
        .config(function($routeProvider)
        {
            $routeProvider
                .when('/',
                    {
                        templateUrl: 'views/home/home.view.html',
                        controller: 'HomeController',
                        resolve: {
                            loggedin: checkCurrentUser
                        }
                    })
                .when('/register',
                    {
                        templateUrl: 'views/users/register.view.html',
                        controller: 'RegisterController'
                    })
                .when('/login',
                    {
                        templateUrl: 'views/users/login.view.html',
                        controller: 'LoginController'
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
                        templateUrl: 'views/admin/admin.view.html',
                        controller: 'AdminController',
                        resolve: {
                            loggedin: checkAdmin
                        }
                    })
                .when('/forms',
                    {
                        templateUrl: 'views/forms/forms.view.html',
                        controller: 'FormsController',
                        resolve: {
                            loggedin: checkLoggedin
                        }
                    })
                .when('/fields',
                    {
                        templateUrl: 'views/forms/fields.view.html',
                        controller: 'FieldsController',
                        resolve: {
                            loggedin: checkLoggedin
                        }
                    })
                .when('/form/:formId/fields',
                    {
                        templateUrl: 'views/forms/fields.view.html',
                        controller: 'FieldsController',
                        resolve: {
                            loggedin: checkLoggedin
                        }
                    })
                .otherwise({
                    redirectTo: '/login'
                });
        });

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope, MsgBusService)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') !== -1)
            {
                $rootScope.user = user;
                MsgBusService.emitMsg('login');
                deferred.resolve();
            }
        });

        return deferred.promise;
    };

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope, MsgBusService)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment/loggedin').success(function(user)
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

        $http.get('/api/assignment/loggedin').success(function(user)
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
