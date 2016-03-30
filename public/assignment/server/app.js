module.exports = function(app, mongoose, db) {
    'use strict';

    var UserSchema = require('./models/user.schema.server.js')(mongoose);
    var FieldSchema = require('./models/field.schema.server.js')(mongoose);
    var FormSchema = require('./models/form.schema.server.js')(mongoose, FieldSchema);

    var UserModel  = mongoose.model('UserModel', UserSchema);
    var FormModel  = mongoose.model('FormModel', FormSchema);

    var User = require('./models/user.model.server.js')(UserModel);
    var Form = require('./models/form.model.server.js')(FormModel);
    var Field = require('./models/field.model.server.js')(FormModel);

    var UserService = require('./services/user.service.server.js')(app, User);
    var FieldService = require('./services/field.service.server.js')(app, Field);
    var FormService = require('./services/form.service.server.js')(app, Form);
};
