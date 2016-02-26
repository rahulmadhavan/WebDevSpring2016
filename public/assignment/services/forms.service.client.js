/**
 * Created by rahulk on 2/25/16.
 */
(function() {

    angular
        .module("FormBuilderApp")
        .factory("FormService",FormService)

    function FormService() {

        var forms = [];
        var formCount = 5;

        var initializeForms = function () {
            forms = [{
                "_id": 1,
                "title": "Contacts",
                "userId": 123
            }, {
                "_id": 2,
                "title": "ToDo",
                "userId": 123
            }, {
                "_id": 3,
                "title": "CDs",
                "userId": 234
            }];
        };

        var getFormId = function() {
            return formCount++
        };


        var service = {};

        service.createFormForUser = function(userId, form, callback) {
            form._id = getFormId();
            form.userId = userId;
            forms.push(form);
            callback(form);
        };

        service.findAllFormsForUser = function(userId, callback) {
            var userForms = forms.filter(function(element) {
                return element.userId == userId
            });
            callback(userForms);
        };

        service.deleteFormById = function(formId, callback) {
            var index = forms.findIndex(function(element) {
                return element._id == formId
            });
            forms.splice(index, 1);
            callback(forms)
        };

        service.updateFormById = function(formId, newForm, callback) {
            var index = forms.findIndex(function(element) {
                return element._id == formId
            });
            if(index != -1) {
                $.extend(forms[index], newForm);
                callback(forms[index])
            } else {
                callback(null)
            }
        };

        return service;

    }
})();
