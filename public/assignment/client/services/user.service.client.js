(function() {
    'use strict';

    angular
        .module('FormBuilderApp')
        .factory('UserService', UserService);

    function UserService($http) {

        var service = {
            findUserByCredentials:findUserByCredentials,
            findUserByUsername:findUserByUsername,
            createUser:createUser,
            findAllUsers:findAllUsers,
            findById:findById,
            updateUser:updateUser,
            deleteUserById:deleteUserById
        };

        return service;

        function findUserByUsername(username) {
            return $http.get('/api/assignment/user?username=' + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get('/api/assignment/user?username=' + username + '&password=' + password);
        }

        function findAllUsers(callback) {
            return $http.get('/api/assignments/user');
        }

        function findById (userId) {
            return $http.get('/api/assignment/user/' + userId);
        }

        function createUser(user) {
            return $http.post('/api/assignment/user', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/assignment/user/' + userId);
        }

        function updateUser(userId, user) {
            return $http.put('/api/assignment/user/' + userId, user);
        }

    }
})();
