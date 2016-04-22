/**
 * Created by rahulk on 3/1/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .controller('HikeController', HikeController);

    function HikeController($rootScope, $scope, $routeParams, $location, HikeService, EventService) {
        $scope.hikeId = $routeParams.hikeId;
        $scope.disqusConfig = {
            disqus_shortname: 'project-cs5610-rahulmadhavan21',// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
            disqus_identifier: '/project/index.html#/hike/' + $routeParams.hikeId,// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
            disqus_url: 'http://localhost:3000/project/index.html#/hike/' + $routeParams.hikeId // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        };
        $scope.eventModel = {};

        $scope.createEvent = createEvent;
        $scope.isUserLoggedIn = isUserLoggedIn;
        $scope.redirectToLogin = redirectToLogin;

        initialize();

        function initialize() {
            HikeService.findHikeById($scope.hikeId)
                .then(success, failure);

            function success(response) {
                if (response.data) {
                    $scope.hike = response.data;
                    $scope.hike.coordinates = [$scope.hike.latitude, $scope.hike.longitude];
                }
            }

            function failure(response) {
                console.log('hike controller initialization failed');
            }
        }

        function createEvent(eventModel) {
            eventModel.createdBy = $rootScope.user._id;
            EventService
                .createEvent(eventModel, $scope.hikeId)
                .then(success, failure);

            function success(response) {
                $location.path('/event/' + response.data._id);
            }

            function failure(response) {
                console.log('hike controller initialization failed');
            }
        }

        function isUserLoggedIn() {
            return $rootScope.user !== undefined && $rootScope.user !== null;
        }

        function redirectToLogin() {
            $location.path('/login').search({hikeId:$scope.hikeId});
        }
    }
})();

