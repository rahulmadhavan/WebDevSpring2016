/**
 * Created by rahulk on 2/26/16.
 */
(function() {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('FormsController', FormsController);

    function FormsController($rootScope, $scope, MsgBusService, FormService, $location) {

        function initialize() {
            FormService.findAllFormsForUser($rootScope.user._id)
                .then(success, failure);

            function success(response) {
                $scope.selectedForm = null;
                $scope.formName = '';
                if (response.data) {
                    $scope.forms = response.data;
                }
            }

            function failure(response) {
                console.log('form controller initialization failed');
            }
        }

        $scope.addForm = function () {
            FormService.createFormForUser($rootScope.user._id, {_id:null, title: $scope.formName})
                .then(success, failure);

            function success(response) {
                if (response.data) {
                    $scope.forms.push(response.data);
                }
            }

            function failure(response) {
                console.log('form creation failed');
            }
        };

        $scope.openForm = function (formId) {
            FormService.getFormById(formId)
                .then(success, failure);

            function success(response) {
                if (response.data) {
                    $rootScope.userSelectedForm = response.data;
                    $location.path('/form/' + formId + '/fields');
                }
            }

            function failure(response) {
                console.log('form open failed');
            }
        };

        $scope.selectForm = function (form, index) {
            $scope.selectedForm = index;
            $scope.formName = $scope.forms[$scope.selectedForm].title;
            $rootScope.selectedFormId = form._id;
        };

        $scope.updateForm = function () {
            if (typeof $scope.selectedForm !== 'undefined' || $scope.selectedForm != null) {
                if (typeof $scope.forms[$scope.selectedForm]._id !== 'undefined') {
                    FormService.updateFormById($scope.forms[$scope.selectedForm]._id,
                        {title: $scope.formName})
                        .then(initialize, failure);
                }
            }

            function failure(response) {
                console.log('form update failed');
            }
        };

        $scope.deleteForm = function (index) {
            FormService.deleteFormById($scope.forms[index]._id)
                .then(initialize, failure);

            function failure(response) {
                console.log('form delete failed');
            }
        };

        MsgBusService.emitMsg('formsView');
        initialize();
    }
})();

