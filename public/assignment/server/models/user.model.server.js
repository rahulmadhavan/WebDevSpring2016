/**
 * Created by rahulk on 3/15/16.
 */
var extend = require('util')._extend
module.exports = function (app) {
    'use strict';
    var users = [];
    var userCount = 5;
    initializeUsers();

    var User = {
        findUserByCredentials:findUserByCredentials,
        findUserByUsername:findUserByUsername,
        create:create,
        findAll:findAll,
        findById:findById,
        update:update,
        deleteById:deleteById
    };

    return User;

    function getUserId() {
        return String(userCount++);
    }

    function initializeUsers() {
        users = require('./user.mock.json');
    }

    function findUserByCredentials(username, password) {
        var result = users.filter(function(element) {
            return element.username === username && element.password === password;
        });
        if (result.length > 0) {
            return result[0];
        } else {
            return null;
        }
    }

    function findUserByUsername(username) {
        var result = users.filter(function(element) {
            return element.username === username;
        });
        if (result.length > 0) {
            return result[0];
        } else {
            return null;
        }
    }

    function create(user) {
        user._id = getUserId();
        users.push(user);
        return users;
    }

    function findAll() {
        return users;
    }

    function findById(userId) {
        var result = users.filter(function(element) {
            return element._id === userId;
        });
        if (result.length > 0) {
            return result[0];
        } else {
            return null;
        }
    }

    function update(userId, user) {
        var index = users.findIndex(function(element) {
            return element._id === userId;
        });
        if (index !== -1) {
            extend(users[index],user);
            return users[index];
        } else {
            return null;
        }
    }

    function deleteById(userId) {
        var index = users.findIndex(function(element) {
            return element._id === userId;
        });
        users.splice(index, 1);
        return users;
    }

};

