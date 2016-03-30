/**
 * Created by rahulk on 3/27/16.
 */
module.exports = function(mongoose) {
    'use strict';

    var FieldSchema = mongoose.Schema({
        label : String,
        type: {
            type: String,
            default: 'TEXT',
            enum: ['TEXT', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES']
        },
        placeholder : String,
        options : [{
                label : String,
                value : String
            }]
    }, {collection: 'field'});

    return FieldSchema;
};

