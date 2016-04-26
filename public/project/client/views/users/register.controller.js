/**
 * Created by rahulk on 2/29/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .controller('RegisterController', RegisterController);

    function RegisterController($rootScope, $routeParams, $scope, $location, UserService) {
        $scope.hikeId = $routeParams.hikeId;
        $scope.register = register;

        function register() {
            var user = {
                username: $scope.username,
                password: $scope.password,
                email: $scope.emailId,
                roles: ['hiker']
            };

            UserService.register(user)
                .then(success, failure);

            function success(response) {
                if (response.data) {
                    $rootScope.user = response.data;
                    if ($scope.hikeId !== undefined) {
                        $location.path('/hike/' + $scope.hikeId).search({hikeId:null});
                    } else {
                        $location.path('/profile');
                    }
                }
            }

            function failure(response) {
                console.log('registration failed');
            }
        }
    }
})();

