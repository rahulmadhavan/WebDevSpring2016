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
                emailId: $scope.emailId,
                roles: ['student']
            };

            UserService.createUser(user, function(u) {
                $rootScope.user = user;
                MsgBusService.emitMsg('login', user);
                $location.path('/profile');
            });
        };
    }
})();

