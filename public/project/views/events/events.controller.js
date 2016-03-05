/**
 * Created by rahulk on 3/1/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .controller('EventsController', EventsController);

    function EventsController($scope) {
        $scope.events = [1,2,3,4,5,6,7];
    }
})();

