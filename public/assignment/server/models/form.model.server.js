/**
 * Created by rahulk on 3/16/16.
 */
var uuid = require('node-uuid');
var q = require('q');
module.exports = function (FormModel) {
    'use strict';

    var Form = {
        getFormById:getFormById,
        createFormForUser:createFormForUser,
        findAllFormsForUser:findAllFormsForUser,
        deleteFormById:deleteFormById,
        updateFormById:updateFormById
    };

    return Form;

    function getFormById(formId) {
        var deferred = q.defer();
        getFormByIdDeferred(deferred, formId);
        return deferred.promise;
    }

    function getFormByIdDeferred(deferred, formId) {
        FormModel.findById(formId, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(form);
            }
        });
    }

    function createFormForUser(userId, form) {
        form.userId = userId;
        delete form._id;
        var deferred = q.defer();
        FormModel.create(form, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log(form);
                deferred.resolve(form);
            }
        });
        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();
        findAllFormsForUserDeferred(userId, deferred);
        return deferred.promise;
    }

    function deleteFormById(userId, formId) {
        var deferred = q.defer();
        FormModel.remove({_id: formId}, function(err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                findAllFormsForUserDeferred(userId, deferred);
            }
        });
        return deferred.promise;
    }

    function findAllFormsForUserDeferred(userId, deferred) {
        var query = FormModel.find({userId:userId});
        query.exec(function(err, forms) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(forms);
            }
        });
    }

    function updateFormById(formId, newForm) {
        var deferred = q.defer();
        delete newForm._id;
        var formFields = {$set:newForm};
        FormModel.findByIdAndUpdate(formId, formFields, function(err, form) {
            if (err) {
                deferred.reject(err);
            } else {
                getFormByIdDeferred(deferred, formId);
            }
        });
        return deferred.promise;
    }

};
