/**
 * Created by rahulk on 3/16/16.
 */
module.exports = function(app, User) {
    'use strict';

    app.post('/api/assignment/user', createUser);
    app.get('/api/assignment/user/:userId', findUserById);
    app.get('/api/assignment/user', getUsers);
    app.put('/api/assignment/user/:userId', updateUserById);
    app.delete('/api/assignment/user/:userId', deleteUserById);

    function createUser(req, res) {
        var user = req.body;
        User.create(user)
            .then(function(user) {
                res.json(user);
            });
    }

    function getUsers(req, res) {
        if (req.query.username && req.query.password) {
            findUserByUsernameAndPassword(req, res);
        } else if (req.query.username) {
            findUserByUsername(req, res);
        } else {
            getAllUsers(req, res);
        }
    }

    function getAllUsers(req, res) {
        User.findAll()
            .then(function(users) {
                res.json(users);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        User.findById(userId)
            .then(function(user) {
                res.json(user);
            });
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        User.findUserByUsername(username)
            .then(function(user) {
                res.json(user);
            });
    }

    function findUserByUsernameAndPassword(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        User.findUserByCredentials(username, password)
            .then(function(user) {
                res.json(user);
            });
    }

    function updateUserById(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        User.update(userId, user)
            .then(function(updatedUser) {
                res.json(updatedUser);
            });
    }

    function deleteUserById(req, res) {
        var userId = req.params.userId;
        User.deleteById(userId)
            .then(function(users) {
                res.json(users);
            });
    }

};
