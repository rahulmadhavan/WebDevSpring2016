/**
 * Created by rahulk on 2/28/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($rootScope, $scope, $location, UserService, MsgBusService) {

        $scope.logout = logout;
        $scope.isLoggedIn = false;
        $scope.isAdmin = false;

        MsgBusService.onMsg('login', initializeHeader);

        function initializeHeader() {
            var currentUser = $rootScope.user;
            if (typeof currentUser !== 'undefined' && currentUser != null) {
                $scope.isLoggedIn = true;
                $scope.isAdmin = $.inArray('admin', currentUser.roles) !== -1;
                $scope.username = currentUser.username;
            } else {
                $scope.isLoggedIn = false;
            }
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.user = null;
                        $scope.isLoggedIn = false;
                        $scope.isAdmin = false;
                        $location.url('/login');
                    },
                    function(err) {
                        $scope.error = err;
                    }
                );
        }
    }
})();
