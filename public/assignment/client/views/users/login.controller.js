/**
 * Created by rahulk on 2/22/16.
 */
(function() {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('LoginController', LoginController);

    function LoginController($rootScope, $scope, $location, UserService, MsgBusService) {
        $scope.login = function() {
            UserService.findUserByCredentials($scope.username, $scope.password)
                .then(success,failure);

            function success(response) {
                if (response.data) {
                    $rootScope.user = response.data;
                    MsgBusService.emitMsg('login');
                    $location.path('/profile');
                }
            }

            function failure(response) {
                console.log('login failed');
            }
        };
    }
})();
