
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

require('./public/assignment/server/app.js')(app);

app.listen(port, ipaddress);
