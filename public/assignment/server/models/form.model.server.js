/**
 * Created by rahulk on 3/16/16.
 */
var extend = require('util')._extend
module.exports = function (app) {
    'use strict';
    var forms = [];
    var formCount = 5;

    var initializeForms = function () {
        forms =  require('./form.mock.json');
    };

    var getFormId = function() {
        return String(formCount++);
    };

    initializeForms();

    var Form = {
        getFormById:getFormById,
        createFormForUser:createFormForUser,
        findAllFormsForUser:findAllFormsForUser,
        deleteFormById:deleteFormById,
        updateFormById:updateFormById
    };

    return Form;

    function getFormById(formId) {
        var result = forms.filter(function(element) {
            return element._id === formId;
        });
        return result[0];
    }

    function createFormForUser(userId, form) {
        form._id = getFormId();
        form.userId = userId;
        forms.push(form);
        return form;
    }

    function findAllFormsForUser(userId) {
        return forms.filter(function(element) {
            return element.userId === userId;
        });
    }

    function deleteFormById(formId) {
        var index = forms.findIndex(function(element) {
            return element._id === formId;
        });
        forms.splice(index, 1);
        return forms;
    }

    function updateFormById(formId, newForm) {
        var index = forms.findIndex(function(element) {
            return element._id === formId;
        });
        if (index !== -1) {
            extend(forms[index], newForm);
            return forms[index];
        } else {
            return null;
        }
    }

};
