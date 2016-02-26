(function() {
    'use strict';

    angular
        .module('FormBuilderApp')
        .factory('UserService', UserService);

    function UserService() {
            var userService = {};

            var users = [];
            var userCount = 5;

            var getUserId = function() {
                return userCount++;
            };

            var initializeUsers = function () {
                users = [{
                    '_id': 1,
                    'firstName': 'Alice',
                    'lastName': 'Wonderland',
                    'username': 'alice',
                    'password': 'alice',
                    'roles': ['student']
                }, {
                    '_id': 2,
                    'firstName': 'Bob',
                    'lastName': 'Hope',
                    'username': 'bob',
                    'password': 'bob',
                    'roles': ['admin']
                }, {
                    '_id': 3,
                    'firstName': 'Charlie',
                    'lastName': 'Brown',
                    'username': 'charlie',
                    'password': 'charlie',
                    'roles': ['faculty']
                }, {
                    '_id': 4,
                    'firstName': 'Dan',
                    'lastName': 'Craig',
                    'username': 'dan',
                    'password': 'dan',
                    'roles': ['faculty', 'admin']
                }, {
                    '_id': 5,
                    'firstName': 'Edward',
                    'lastName': 'Norton',
                    'username': 'ed',
                    'password': 'ed',
                    'roles': ['student']
                }];
            };

            userService.findUserByCredentials = function(username, password, callback) {
                var result = users.filter(function(element) {
                    return element.username === username && element.password === password;
                });
                if (result.length > 0) {
                    callback(result[0]);
                } else {
                    callback(null);
                }
            };

            userService.findAllUsers = function(callback) {
                callback(users);
            };

            userService.createUser = function(user, callback) {
                user._id = getUserId();
                users.push(user);
                callback(user);
            };

            userService.deleteUserById = function(userId, callback) {
                var index = users.findIndex(function(element) {
                    return element._id === userId;
                });
                users.splice(index, 1);
                callback(users);
            };

            userService.updateUser = function(userId, user, callback) {
                var index = users.findIndex(function(element) {
                    return element._id === userId;
                });
                if (index !== -1) {
                    $.extend(users[index],user);
                    callback(users[index]);
                } else {
                    callback(null);
                }
            };

            initializeUsers();

            return userService;
        }
})();
