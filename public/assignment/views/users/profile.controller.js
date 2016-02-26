/**
 * Created by rahulk on 2/23/16.
 */
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService, MsgBusService) {

        var user = $rootScope.user;

        if(typeof user != 'undefined' && user != null) {
            $scope.username = user.username;
            $scope.emailId = user.emailId;
            $scope.firstName = user.firstName;
            $scope.lastName = user.lastName;
            $scope.roles = user.roles;
        }

        $scope.update = function() {
            var updatedUser = {
                "username": $scope.username,
                "password": $scope.password,
                "emailId": $scope.emailId,
                "firstName": $scope.firstName,
                "lastName": $scope.lastName,
                "roles": $scope.roles
            };
            UserService.updateUser(user._id, updatedUser, function(u) {
                $rootScope.user = u;
                MsgBusService.emitMsg('update', u);
            })
        }

        MsgBusService.emitMsg('profileView')
    }
})();

