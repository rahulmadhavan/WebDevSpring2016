/**
 * Created by rahulk on 3/17/16.
 */
var extend = require('util')._extend;
var uuid = require('node-uuid');
var q = require('q');
module.exports = function (FormModel) {
    'use strict';

    var Field = {
        getFieldsForForm:getFieldsForForm,
        getFieldForFormById:getFieldForFormById,
        deleteFieldForFormById:deleteFieldForFormById,
        createFieldForForm:createFieldForForm,
        updateFieldFormById:updateFieldFormById
    };

    return Field;

    function getFieldsForForm(formId) {
        var deferred = q.defer();
        getFieldsForFormDeferred(deferred, formId);
        return deferred.promise;
    }

    function getFieldsForFormDeferred(deferred,formId) {
        FormModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form.fields);
            }
        });
    }

    function getFieldForFormById(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form.fields.id(fieldId));
            }
        });
        return deferred.promise;
    }

    function deleteFieldForFormById(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                form.fields.id(fieldId).remove();
                form.markModified('fields');
                form.save(function(err, status) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        getFieldsForFormDeferred(deferred, formId);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function createFieldForForm(formId, field) {
        var deferred = q.defer();
        delete field._id;
        FormModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                var newField = form.fields.create(field);
                form.fields.push(newField);
                form.markModified('fields');
                form.save(function(err, status) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(newField);
                    }
                });
            }
        });
        return deferred.promise;
    }

    function updateFieldFormById(formId, fieldId, newField) {
        var deferred = q.defer();
        delete newField._id;
        FormModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                var field = form.fields.id(fieldId);
                extend(field, newField);
                form.save(function(err, status) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(field);
                    }
                });
            }
        });
        return deferred.promise;
    }

};
