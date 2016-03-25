/**
 * Created by rahulk on 3/15/16.
 */
var extend = require('util')._extend;
var uuid = require('node-uuid')
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
        return uuid.v1();
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

    function update(userId, newUser) {
        var result = users.filter(function(element) {
            return element._id === userId;
        });
        var user;
        if (result !== undefined) {
            user = result[0];
            extend(user, newUser);
        }
        return user;
    }

    function deleteById(userId) {
        var result = users.filter(function(element) {
            return element._id === userId;
        });
        var index = users.indexOf(result[0]);
        users.splice(index, 1);
        return users;
    }

};

