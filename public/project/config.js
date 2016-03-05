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
                        controller: 'ProfileController'
                    })
                .when('/hikes',
                    {
                        templateUrl: 'views/hikes/hikes.view.html',
                        controller: 'HikesController'
                    })
                .when('/hike',
                    {
                        templateUrl: 'views/hikes/hike.view.html',
                        controller: 'HikeController'
                    })
                .when('/events',
                    {
                        templateUrl: 'views/events/events.view.html',
                        controller: 'EventsController'
                    })
                .when('/event',
                    {
                        templateUrl: 'views/events/event.view.html',
                        controller: 'EventController'
                    })
                .when('/users',
                    {
                        templateUrl: 'views/users/users.view.html',
                        controller: 'UsersController'
                    });
        });
})();
