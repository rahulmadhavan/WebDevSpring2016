/**
 * Created by rahulk on 2/22/16.
 */
(function() {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($rootScope, $scope, $location, MsgBusService, UserService) {

        var displayAdminNavBar = function () {
            $('#header-register-link').addClass('hidden');
            $('#header-login-link').addClass('hidden');
            $('#header-logout-link').removeClass('hidden');
            $('#header-admin-link').removeClass('hidden');
            $('#header-profile-link').removeClass('hidden');
        };

        var displayUserNavBar = function () {
            $('#header-register-link').addClass('hidden');
            $('#header-login-link').addClass('hidden');
            $('#header-admin-link').addClass('hidden');
            $('#header-logout-link').removeClass('hidden');
            $('#header-profile-link').removeClass('hidden');
        };

        var displayNewUserNavBar = function () {
            $('#header-register-link').removeClass('hidden');
            $('#header-login-link').removeClass('hidden');
            $('#header-admin-link').addClass('hidden');
            $('#header-logout-link').addClass('hidden');
            $('#header-profile-link').addClass('hidden');
        };

        var displayNavBar = function() {
            var user = $rootScope.user;
            if (typeof user !== 'undefined' && user != null) {
                if ($.inArray('admin', user.roles) === -1) {
                    displayUserNavBar();
                } else {
                    displayAdminNavBar();
                }
                $scope.username = user.username;
            } else {
                displayNewUserNavBar();
            }
        };

        MsgBusService.onMsg('login', displayNavBar);

        MsgBusService.onMsg('logout', displayNavBar);

        MsgBusService.onMsg('update', function (event, user) {
            $scope.username = user.username;
        });

        $scope.logout = function () {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.user = null;
                        MsgBusService.emitMsg('logout');
                        $location.url('/login');
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        };

        displayNavBar();
    }

})();
