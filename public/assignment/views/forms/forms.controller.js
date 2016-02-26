/**
 * Created by rahulk on 2/26/16.
 */
(function() {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('FormsController', FormsController);

    function FormsController($rootScope, $scope, MsgBusService, FormService) {

        FormService.findAllFormsForUser($rootScope.user._id, function(forms) {
            $scope.forms = forms;
        });

        $scope.addForm = function () {
            FormService.createFormForUser(
                $rootScope.user._id,
                {title: $scope.formName},
                function (form) {
                    $scope.forms.push(form);
                });
        };

        $scope.selectForm = function (index) {
            $scope.selectedForm = index;
            $scope.formName = $scope.forms[$scope.selectedForm].title;
        };

        $scope.updateForm = function () {
            if (typeof $scope.selectedForm !== 'undefined' || $scope.selectedForm != null) {
                if (typeof $scope.forms[$scope.selectedForm]._id !== 'undefined') {
                    FormService.updateFormById(
                        $scope.forms[$scope.selectedForm]._id,
                        {title: $scope.formName},
                        function (form) {
                            FormService.findAllFormsForUser($rootScope.user._id, function(forms) {
                                $scope.forms = forms;
                            });
                            $scope.selectedForm = null;
                            $scope.formName = '';
                        });
                }
            }
        };

        $scope.deleteForm = function (index) {
            FormService.deleteFormById(
                $scope.forms[index]._id,
                function (form) {
                    FormService.findAllFormsForUser($rootScope.user._id, function(forms) {
                        $scope.forms = forms;
                    });
                });
        };

        MsgBusService.emitMsg('formsView');
    }
})();

