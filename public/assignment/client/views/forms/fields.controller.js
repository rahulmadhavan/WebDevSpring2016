/**
 * Created by rahulk on 2/26/16.
 */
(function() {
    'use strict';

    angular
            .module('FormBuilderApp')
        .controller('FieldsController', FieldsController);

    function FieldsController($rootScope, $scope, FieldService, $routeParams, FormService) {

        $scope.sortableOptions = {
            handle: '.myHandle',
            helper: function(e, tr) {
                var $originals = tr.children();
                var $helper = tr.clone();
                $helper.children().each(function(index) {
                    // Set helper cell sizes to match the original sizes
                    $(this).width($originals.eq(index).width());
                });
                return $helper;
            },
            stop: function(e, ui) {
                FormService
                    .updateFormById($scope.formId,{fields:$scope.fields})
                    .then(initFields);
            }
        };

        if ($routeParams.formId) {
            $scope.formId = $routeParams.formId;
        }

        var fieldTypeDefaultValues = {
            'TEXT':{_id: null, label: 'New Text Field', type: 'TEXT', placeholder: 'New Field'},
            'TEXTAREA':{_id: null, label: 'New Text Field',
                type: 'TEXTAREA', placeholder: 'New Field'},
            'DATE':{_id: null, label: 'New Date Field', type: 'DATE'},
            'OPTIONS':{_id: null, label: 'New Dropdown', type: 'OPTIONS', options: [
                {label: 'Option 1', value: 'OPTION_1'},
                {label: 'Option 2', value: 'OPTION_2'},
                {label: 'Option 3', value: 'OPTION_3'}
            ]},
            'CHECKBOXES':{_id: null, label: 'New Checkboxes', type: 'CHECKBOXES', options: [
                {label: 'Option A', value: 'OPTION_A'},
                {label: 'Option B', value: 'OPTION_B'},
                {label: 'Option C', value: 'OPTION_C'}
            ]},
            'RADIOS': {_id: null, label: 'New Radio Buttons', type: 'RADIOS', options: [
                {label: 'Option X', value: 'OPTION_X'},
                {label: 'Option Y', value: 'OPTION_Y'},
                {label: 'Option Z', value: 'OPTION_Z'}
            ]}
        };

        $scope.fields = [];

        $scope.fieldTypes = [{
                title:'Single Line Text Field',
                tag:'TEXT'
            }, {
                title:'Multi Line Text Field',
                tag:'TEXTAREA'
            }, {
                title:'Dropdown Field',
                tag:'OPTIONS'
            }, {
                title:'Date Field',
                tag:'DATE'
            }, {
                title:'Checkboxes Field',
                tag:'CHECKBOXES'
            }, {
                title:'Radio Buttons Field',
                tag:'RADIOS'
            }
        ];

        function initialize() {
            $scope.userSelectedForm = $rootScope.userSelectedForm;
            initFields();
        }

        function initFields() {
            FieldService
                .getFieldForForm($scope.formId)
                .then(success);

            function success(response) {
                $scope.fields = response.data;
            }
        }

        $scope.selectInputFieldType = function() {
            var index = $scope.fieldTypes.indexOf($scope.selectedInputFieldType);
        };

        $scope.addInputField = function(selectedInputFieldType) {
            var fieldTemplate = fieldTypeDefaultValues[selectedInputFieldType.tag];
            var newField = $.extend({},fieldTemplate);
            FieldService.createFieldForForm($scope.formId, newField)
                .then(initFields);
        };

        $scope.editField = function(field) {
            var editedField = $.extend({},field);
            editedField.originalField = field;
            if (editedField.type === 'OPTIONS' ||
                editedField.type === 'CHECKBOXES' ||
                editedField.type === 'RADIOS') {
                editedField.optionText = editedField.options.map(function(obj) {
                    return '' + obj.label + ':' + obj.value;
                });
            }
            $scope.editFieldModel = editedField;
        };

        $scope.deleteField = function(field) {
            FieldService.deleteFieldFromForm($scope.formId, field._id)
                .then(initFields);
        };

        $scope.saveEdit = function(editedField) {
            if (editedField.type === 'OPTIONS' ||
                editedField.type === 'CHECKBOXES' ||
                editedField.type === 'RADIOS') {

                editedField.originalField.options = editedField.optionText.map(function(tuple) {
                        var tupleValues = tuple.split(':');
                        return {label:tupleValues[0], value:tupleValues[1]};
                    });
            } else if (editedField.type === 'TEXT' ||
                editedField.type === 'TEXTAREA') {
                editedField.originalField.placeholder = editedField.placeholder;
            }
            editedField.originalField.label = editedField.label;
            FieldService.updateField($scope.formId, editedField.originalField._id,
                editedField.originalField).then(initFields());
        };

        initialize();
    }
})();
