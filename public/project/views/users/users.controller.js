/**
 * Created by rahulk on 3/4/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .controller('UsersController', UsersController);

    function UsersController($rootScope, $scope, $location) {
        $scope.users = [1,2,3,4,5,6,7];
    }
})();

