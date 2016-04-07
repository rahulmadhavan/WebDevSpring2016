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
            deleteUserById:deleteUserById,
            login:login,
            register:register,
            logout:logout
        };

        return service;

        function findUserByUsername(username) {
            return $http.get('/api/assignment/user?username=' + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get('/api/assignment/user?username=' + username + '&password=' + password);
        }

        function findAllUsers(callback) {
            return $http.get('/api/assignment/admin/user');
        }

        function findById (userId) {
            return $http.get('/api/assignment/user/' + userId);
        }

        function createUser(user) {
            return $http.post('/api/assignment/admin/user', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/assignment/admin/user/' + userId);
        }

        function updateUser(userId, user) {
            return $http.put('/api/assignment/admin/user/' + userId, user);
        }

        function register(user) {
            return $http.post('/api/assignment/register', user);
        }

        function login(user) {
            return $http.post('/api/assignment/login', user);
        }

        function logout() {
            return $http.post('/api/assignment/logout');
        }

    }
})();
