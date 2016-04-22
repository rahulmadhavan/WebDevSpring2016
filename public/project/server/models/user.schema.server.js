/**
 * Created by rahulk on 4/16/16.
 */
module.exports = function(mongoose) {
    'use strict';

    var UserSchema = mongoose.Schema({
        username : String,
        password: String,
        firstName : String,
        lastName : String,
        email : String,
        roles: [String],
        gravatarEmail: String
    }, {collection: 'user_project'});

    return UserSchema;
};

