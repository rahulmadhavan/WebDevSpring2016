/**
 * Created by rahulk on 3/19/16.
 */
(function() {
    'use strict';

    angular
        .module('FormBuilderApp')
        .factory('FieldService', FieldService);

    function FieldService($http) {

        var service = {
            createFieldForForm:createFieldForForm,
            getFieldForForm:getFieldForForm,
            getFieldsForForm:getFieldsForForm,
            deleteFieldFromForm:deleteFieldFromForm,
            updateField:updateField
        };

        return service;

        function createFieldForForm(formId, field) {
            return $http.post('/api/assignment/form/' + formId + '/field', field);
        }

        function getFieldForForm(formId) {
            return $http.get('/api/assignment/form/' + formId + '/field');
        }

        function getFieldsForForm(formId, fieldId) {
            return $http.get('/api/assignment/form/' + formId + '/field/' + fieldId);
        }

        function deleteFieldFromForm(formId, fieldId) {
            return $http.delete('/api/assignment/form/' + formId + '/field/' + fieldId);
        }

        function updateField(formId, fieldId, field) {
            return $http.put('/api/assignment/form/' + formId + '/field/' + fieldId, field);
        }

    }
})();
