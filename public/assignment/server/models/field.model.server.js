/**
 * Created by rahulk on 3/17/16.
 */
var extend = require('util')._extend;
module.exports = function (app, Form) {
    'use strict';

    var fieldCount = 20;

    var getFieldId = function() {
        return String(fieldCount++);
    };

    var Field = {
        getFieldsForForm:getFieldsForForm,
        getFieldForFormById:getFieldForFormById,
        deleteFieldForFormById:deleteFieldForFormById,
        createFieldForForm:createFieldForForm,
        updateFieldFormById:updateFieldFormById
    };

    return Field;

    function getFieldsForForm(formId) {
        var form = Form.getFormById(formId);
        return form.fields;
    }

    function getFieldForFormById(formId, fieldId) {
        var field;
        var form = Form.getFormById(formId);
        if (form.fields !== undefined) {
            var result = form.fields.filter(function(element) {
                return element._id === fieldId;
            });
            if (result !== undefined) {
                field = result[0];
            }
        }
        return field;
    }

    function deleteFieldForFormById(formId, fieldId) {
        var fields;
        var form = Form.getFormById(formId);
        if (form.fields !== undefined) {
            var result = form.fields.filter(function(element) {
                return element._id === fieldId;
            });
            var index = form.fields.indexOf(result[0]);
            form.fields.splice(index, 1);
            fields = form.fields;
        }
        return fields;
    }

    function createFieldForForm(formId, field) {
        field._id = getFieldId();
        field.formId = formId;
        var form = Form.getFormById(formId);
        if (form.fields === undefined) {
            form.fields = [];
        }
        form.fields.push(field);
        return field;
    }

    function updateFieldFormById(formId, fieldId, newField) {
        var field;
        var form = Form.getFormById(formId);
        if (form.fields !== undefined) {
            var result = form.fields.filter(function(element) {
                return element._id === fieldId;
            });
            if (result !== undefined) {
                field = result[0];
                extend(field, newField);
            }
        }
        return field;
    }

};
