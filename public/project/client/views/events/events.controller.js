/**
 * Created by rahulk on 3/1/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .controller('EventsController', EventsController);

    function EventsController($scope, $rootScope, $location, EventService) {
        $scope.events = [];
        $scope.openEvent = openEvent;

        initialize();

        function initialize() {
            EventService.findAllEventsForUser($rootScope.user._id)
                .then(success, failure);

            function success(response) {
                if (response.data) {
                    $scope.events = response.data;
                }
            }

            function failure(response) {
                console.log('event controller initialization failed');
            }
        }

        function openEvent(event) {
            $location.path('/event/' + event._id);
        }
    }
})();

