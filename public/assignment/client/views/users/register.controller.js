/**
 * Created by rahulk on 2/23/16.
 */
(function() {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('RegisterController', RegisterController);

    function RegisterController($rootScope, $scope, $location, UserService, MsgBusService) {

        $scope.register = function() {
            var user = {
                username: $scope.username,
                password: $scope.password,
                emails: $scope.emailId,
                roles: ['student']
            };

            UserService.register(user)
                .then(success, failure);

            function success(response) {
                if (response.data) {
                    var user = response.data;
                    $rootScope.user = user;
                    MsgBusService.emitMsg('login', user);
                    $location.path('/profile');
                }
            }

            function failure(response) {
                console.log('registration failed');
            }
        };
    }
})();

