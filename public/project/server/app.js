module.exports = function(app, mongoose, db) {
    'use strict';

    var UserSchema = require('./models/user.schema.server.js')(mongoose);
    var HikeSchema = require('./models/hike.schema.server.js')(mongoose);
    var EventSchema = require('./models/event.schema.server.js')(mongoose);

    var UserModel  = mongoose.model('UserProjectModel', UserSchema);
    var HikeModel  = mongoose.model('HikeModel', HikeSchema);
    var EventModel  = mongoose.model('EventModel', EventSchema);

    var User = require('./models/user.model.server.js')(UserModel);
    var Hike = require('./models/hike.model.server.js')(HikeModel);
    var Event = require('./models/event.model.server.js')(EventModel);

    var UserService = require('./services/user.service.server.js')(app, User);
    var HikeService = require('./services/hike.service.server.js')(app, Hike);
    var EventService = require('./services/event.service.server.js')(app, Event);
};
