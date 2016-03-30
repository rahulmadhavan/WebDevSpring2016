var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var sayHello = function (req, res) {
    console.log('Say Hello');
    res.send('<h1>Say Hello</h1>');
};

// default to a 'localhost' configuration:
var connectionString = 'mongodb://127.0.0.1:27017/cs5610spring2016-1';

// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

console.log(connectionString);

var db = mongoose.connect(connectionString);

require('./public/assignment/server/app.js')(app, mongoose, db);

app.listen(port, ipaddress);
