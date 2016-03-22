/**
 * Created by rahulk on 2/22/16.
 */
(function() {
    'use strict';

    angular
        .module('FormBuilderApp')
        .controller('SidebarController', SidebarController);

    function SidebarController($rootScope, $scope, MsgBusService) {

        var displayAdminSideBar = function () {
            $('#sidebar-home-link').removeClass('hidden');
            $('#sidebar-forms-link').removeClass('hidden');
            $('#sidebar-admin-link').removeClass('hidden');
            $('#sidebar-profile-link').removeClass('hidden');
        };

        var displayUserSideBar = function () {
            $('#sidebar-home-link').removeClass('hidden');
            $('#sidebar-forms-link').removeClass('hidden');
            $('#sidebar-admin-link').addClass('hidden');
            $('#sidebar-profile-link').removeClass('hidden');
        };

        var displayNewUserSideBar = function () {
            $('#sidebar-home-link').removeClass('hidden');
            $('#sidebar-forms-link').addClass('hidden');
            $('#sidebar-admin-link').addClass('hidden');
            $('#sidebar-profile-link').addClass('hidden');
        };

        var activateAdmin = function () {
            $('#sidebar-home-link').removeClass('active');
            $('#sidebar-forms-link').removeClass('active');
            $('#sidebar-admin-link').addClass('active');
            $('#sidebar-profile-link').removeClass('active');
        };

        var activateProfile = function () {
            $('#sidebar-home-link').removeClass('active');
            $('#sidebar-forms-link').removeClass('active');
            $('#sidebar-admin-link').removeClass('active');
            $('#sidebar-profile-link').addClass('active');
        };

        var activateHome = function () {
            $('#sidebar-home-link').addClass('active');
            $('#sidebar-forms-link').removeClass('active');
            $('#sidebar-admin-link').removeClass('active');
            $('#sidebar-profile-link').removeClass('active');
        };

        var activateForms = function () {
            $('#sidebar-home-link').removeClass('active');
            $('#sidebar-forms-link').addClass('active');
            $('#sidebar-admin-link').removeClass('active');
            $('#sidebar-profile-link').removeClass('active');
        };

        var displaySideBar = function() {
            var user = $rootScope.user;
            if (typeof user !== 'undefined' && user != null) {
                if ($.inArray('admin', user.roles) === -1) {
                    displayUserSideBar();
                } else {
                    displayAdminSideBar();
                }
                $scope.username = user.username;
            } else {
                displayNewUserSideBar();
            }
        };

        MsgBusService.onMsg('login', displaySideBar);
        MsgBusService.onMsg('logout', displaySideBar);

        MsgBusService.onMsg('profileView', activateProfile);
        MsgBusService.onMsg('homeView', activateHome);
        MsgBusService.onMsg('adminView', activateAdmin);
        MsgBusService.onMsg('formsView', activateForms);

        displaySideBar();
    }
})();
