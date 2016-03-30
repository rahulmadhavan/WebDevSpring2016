/**
 * Created by rahulk on 3/15/16.
 */
var uuid = require('node-uuid');
var q = require('q');
module.exports = function (UserModel) {
    'use strict';

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

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        var query = UserModel.findOne({username:username, password:password});
        query.exec(function(err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        var query = UserModel.findOne({username:username});
        query.exec(function(err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function create(user) {
        var deferred = q.defer();
        delete user._id;
        UserModel.create(user, function(err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findAll() {
        var deferred = q.defer();
        findAllDeferred(deferred);
        return deferred.promise;
    }

    function findAllDeferred(deferred) {
        UserModel.find(function(err, users) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(users);
            }
        });
    }

    function findByIdDeferred(userId, deferred) {
        UserModel.findById(userId, function(err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
    }

    function findById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function update(userId, newUser) {
        var deferred = q.defer();
        delete newUser._id;
        //console.log(newUser);
        var userFields = {$set:newUser};
        UserModel.findByIdAndUpdate(userId, userFields, function(err, user) {
            if (err) {
                deferred.reject(err);
            } else {
                //console.log(user);
                findByIdDeferred(userId, deferred);
            }
        });
        return deferred.promise;
    }

    function deleteById(userId) {
        var deferred = q.defer();
        UserModel.remove({_id: userId}, function(err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                findAllDeferred(deferred);
            }
        });
        return deferred.promise;
    }

};

