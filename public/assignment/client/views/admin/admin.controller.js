/**
 * Created by rahulk on 2/23/16.
 */
(function() {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('AdminController', AdminController);

    function AdminController($scope, MsgBusService, UserService) {
        MsgBusService.emitMsg('adminView');
        initialize();

        $scope.sortType     = 'username';
        $scope.sortReverse  = false;

        $scope.remove = remove;
        $scope.update = update;
        $scope.add    = add;
        $scope.select = select;

        function initialize() {
            UserService
                .findAllUsers()
                .then(handleResponse, handleError);
        }

        function remove(user) {
            UserService
                .deleteUserById(user._id)
                .then(handleSuccess, handleError);
        }

        function update(user) {
            if (user !== undefined) {
                if (user.roles !== undefined && user._id !== undefined) {
                    user.roles = user.roles.split(',').map(function(str) {return str.trim();});
                }
                UserService
                    .updateUser(user._id, user)
                    .then(handleSuccess, handleError);
            }
        }

        function add(user) {
            if (user !== undefined) {
                if (user.roles !== undefined) {
                    user.roles = user.roles.split(',').map(function(str) {return str.trim();});
                }
                UserService
                    .createUser(user)
                    .then(handleSuccess, handleError);
            }
        }

        function select(user) {
            $scope.selectedUser = angular.copy(user);
            $scope.selectedUser.password = '';
        }

        function handleResponse(response) {
            $scope.users = response.data.map(function(u) {
                if (u.roles !== undefined) {
                    u.roles = u.roles.join(', ');
                } else {
                    u.roles = '';
                }
                return u;
            });
            $scope.selectedUser = undefined;
        }

        function handleSuccess(response) {
            initialize();
        }

        function handleError(error) {
            $scope.error = error;
        }
    }
})();
