/**
 * Created by rahulk on 4/16/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .factory('UserService', UserService);

    function UserService($http) {

        var service = {
            findUserByCredentials:findUserByCredentials,
            findUserByUsername:findUserByUsername,
            findUsersByUsernameOrEmail:findUsersByUsernameOrEmail,
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
            return $http.get('/api/project/user?username=' + username);
        }

        function findUsersByUsernameOrEmail(text) {
            return $http.get('/api/project/user?search=' + text);
        }

        function findUserByCredentials(username, password) {
            return $http.get('/api/project/user?username=' + username + '&password=' + password);
        }

        function findAllUsers(callback) {
            return $http.get('/api/project/admin/user');
        }

        function findById (userId) {
            return $http.get('/api/project/user/' + userId);
        }

        function createUser(user) {
            return $http.post('/api/project/admin/user', user);
        }

        function deleteUserById(userId) {
            return $http.delete('/api/project/admin/user/' + userId);
        }

        function updateUser(userId, user) {
            return $http.put('/api/project/admin/user/' + userId, user);
        }

        function register(user) {
            return $http.post('/api/project/register', user);
        }

        function login(user) {
            return $http.post('/api/project/login', user);
        }

        function logout() {
            return $http.post('/api/project/logout');
        }

    }
})();
