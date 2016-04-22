/**
 * Created by rahulk on 4/16/16.
 */
module.exports = function(mongoose) {
    'use strict';

    var HikeSchema = mongoose.Schema({
        name : String,
        header : String,
        shortDescription: String,
        longDescription : String,
        latitude : String,
        longitude : String,
        imageUrl: String
    }, {collection: 'hike'});

    return HikeSchema;
};
