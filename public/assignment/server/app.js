module.exports = function(app) {
    'use strict';

    var User = require('./models/user.model.server.js')(app);
    var Form = require('./models/form.model.server.js')(app);
    var Field = require('./models/field.model.server.js')(app, Form);

    var UserService = require('./services/user.service.server.js')(app, User);
    var FormService = require('./services/form.service.server.js')(app, Form);
    var FieldService = require('./services/field.service.server.js')(app, Field);
};
