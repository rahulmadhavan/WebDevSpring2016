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
        var users = User.create(user);
        res.json(users);
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
        var users = User.findAll();
        res.json(users);
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = User.findById(userId);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        var user = User.findUserByUsername(username);
        res.json(user);
    }

    function findUserByUsernameAndPassword(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var user = User.findUserByCredentials(username, password);
        res.json(user);
    }

    function updateUserById(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        var updatedUser = User.update(userId, user);
        res.json(updatedUser);
    }

    function deleteUserById(req, res) {
        var userId = req.params.userId;
        var users = User.deleteById(userId);
        res.json(users);
    }

};
