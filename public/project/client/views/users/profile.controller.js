/**
 * Created by rahulk on 2/29/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($rootScope, $scope, UserService, gravatarUrlFilter) {
        var user = $rootScope.user;
        $scope.imageSize = 200;

        setUserFields(user);

        $scope.update = update;

        function update() {
            var updatedUser = {
                'username': $scope.username,
                'password': $scope.password,
                'email': $scope.emailId,
                'firstName': $scope.firstName,
                'lastName': $scope.lastName,
                'roles': $scope.roles,
                'gravatarEmail': $scope.gravatarEmail
            };
            console.log(updatedUser);
            UserService.updateUser(user._id, updatedUser)
                .then(success, failure);

            function success(response) {
                if (response.data) {
                    $rootScope.user = response.data;
                }
            }

            function failure(response) {
                console.log('profile retrival failed');
            }

        }

        function setUserFields(user) {
            if (typeof user !== 'undefined' && user != null) {
                $scope.username = user.username;
                $scope.emailId = user.email;
                $scope.firstName = user.firstName;
                $scope.lastName = user.lastName;
                $scope.roles = user.roles;
                $scope.gravatarEmail = user.gravatarEmail;
            }
        }
    }
})();
