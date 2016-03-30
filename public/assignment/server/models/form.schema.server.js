/**
 * Created by rahulk on 3/27/16.
 */
module.exports = function(mongoose, FieldSchema) {
    'use strict';

    var FormSchema = mongoose.Schema({
        userId : String,
        title : {
            type : String,
            default : 'New Form'
        },
        fields : [FieldSchema],
        created : {
            type : Date,
            default: Date.now
        },
        updated : {
            type : Date,
            default: Date.now
        }
    }, {collection: 'form'});

    return FormSchema;
};
