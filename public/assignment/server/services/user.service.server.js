/**
 * Created by rahulk on 3/16/16.
 */
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt           = require('bcrypt-nodejs');

module.exports = function(app, User) {
    'use strict';

    var auth = authorized;
    var admin = isAdmin;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/assignment/admin/user', admin, createUser);
    app.get('/api/assignment/admin/user/:userId', admin, findUserByIdAdmin);
    app.get('/api/assignment/admin/user', admin, getUsers);
    app.put('/api/assignment/admin/user/:userId', auth, updateUserById);
    app.delete('/api/assignment/admin/user/:userId', admin, deleteUserById);

    app.get('/api/assignment/user/:userId', auth, findUserById);

    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.post('/api/assignment/logout', logout);
    app.get('/api/assignment/loggedin', loggedin);
    app.post('/api/assignment/register', register);

    function createUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
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

    function findUserByIdAdmin(req, res) {
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
        if (!isAdminUser(req.user)) {
            delete user.roles;
        }
        if (user.password) {
            user.password = bcrypt.hashSync(user.password);
        }
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

    function localStrategy(username, password, done) {
        User
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.password = bcrypt.hashSync(newUser.password);
        newUser.roles = ['student'];

        User
            .findUserByUsername(newUser.username)
            .then(
                function(user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return User.create(newUser);
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(user) {
                    if (user) {
                        req.login(user, function(err) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        User
            .findById(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(err) {
                    done(err, null);
                }
            );
    }

    function isAdmin(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            if (isAdminUser(req.user)) {
                next();
            } else {
                res.send(403);
            }
        }
    }

    function isAdminUser(user) {
        if (user.roles !== undefined) {
            if (user.roles.indexOf('admin') >= 0) {
                return true;
            }
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

};
