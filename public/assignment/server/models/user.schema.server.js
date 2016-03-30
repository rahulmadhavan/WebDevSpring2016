/**
 * Created by rahulk on 3/27/16.
 */
module.exports = function(mongoose) {
    'use strict';

    var UserSchema = mongoose.Schema({
        username : String,
        password: String,
        firstName : String,
        lastName : String,
        emails : String,
        phones : [String]
    }, {collection: 'user'});

    return UserSchema;
};
