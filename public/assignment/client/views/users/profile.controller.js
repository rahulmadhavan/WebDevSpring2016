/**
 * Created by rahulk on 2/23/16.
 */
(function() {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($rootScope, $scope, UserService, MsgBusService) {

        var user = $rootScope.user;

        setUserFields(user);

        $scope.update = function() {
            var updatedUser = {
                'username': $scope.username,
                'password': $scope.password,
                'emails': $scope.emailId,
                'firstName': $scope.firstName,
                'lastName': $scope.lastName,
                'roles': $scope.roles
            };
            UserService.updateUser(user._id, updatedUser)
                .then(success, failure);

            function success(response) {
                if (response.data) {
                    var u = response.data;
                    $rootScope.user = u;
                    setUserFields($rootScope.user);
                    MsgBusService.emitMsg('update', u);
                }
            }

            function failure(response) {
                console.log('profile retrival failed');
            }

        };

        function setUserFields(user) {
            if (typeof user !== 'undefined' && user != null) {
                $scope.username = user.username;
                $scope.emailId = user.emails;
                $scope.firstName = user.firstName;
                $scope.lastName = user.lastName;
                $scope.roles = user.roles;
            }
        }

        MsgBusService.emitMsg('profileView');
    }
})();

