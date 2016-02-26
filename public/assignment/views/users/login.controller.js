/**
 * Created by rahulk on 2/22/16.
 */
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $scope, $location, UserService, MsgBusService) {
        $scope.login = function() {
            UserService.findUserByCredentials($scope.username, $scope.password, function(user){
                if(user != null) {
                    $rootScope.user = user;
                    MsgBusService.emitMsg('login');
                    $location.path("/profile")
                }
            })
        }
    }
})();