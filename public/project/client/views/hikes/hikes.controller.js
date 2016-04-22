/**
 * Created by rahulk on 3/1/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .controller('HikesController', HikesController);

    function HikesController($scope, $location, HikeService) {
        $scope.hikes = [];
        $scope.openHike = openHike;

        initialize();

        function initialize() {
            HikeService.findAllHikes()
                .then(success, failure);

            function success(response) {
                if (response.data) {
                    $scope.hikes = response.data;
                }
            }

            function failure(response) {
                console.log('hike controller initialization failed');
            }
        }

        function openHike(hike) {
            $location.path('/hike/' + hike._id);
        }

    }
})();

