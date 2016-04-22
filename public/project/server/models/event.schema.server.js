/**
 * Created by rahulk on 4/16/16.
 */
module.exports = function(mongoose) {
    'use strict';

    var EventSchema = mongoose.Schema({
        name : String,
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserProjectModel'
        },
        hike: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'HikeModel'
        },
        participants: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserProjectModel'
        }],
        todos:{
            pending: [String],
            done: [String]
        },
        eventDate : {
            type : Date,
            default: Date.now
        }
    }, {collection: 'event'});

    return EventSchema;
};

