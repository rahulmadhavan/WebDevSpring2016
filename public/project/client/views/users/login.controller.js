/**
 * Created by rahulk on 2/29/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .controller('LoginController', LoginController);

    function LoginController($rootScope, $scope, $location, $routeParams, UserService, MsgBusService) {
        $scope.login = login;
        $scope.hikeId = $routeParams.hikeId;

        function login() {
            UserService.login({username:$scope.username, password:$scope.password})
                .then(success,failure);

            function success(response) {
                if (response.data) {
                    $rootScope.user = response.data;
                    MsgBusService.emitMsg('login');
                    if ($scope.hikeId !== undefined) {
                        $location.path('/hike/' + $scope.hikeId).search({hikeId:null});
                    } else {
                        $location.path('/profile');
                    }
                }
            }

            function failure(response) {
                console.log('login failed');
            }
        }
    }
})();
