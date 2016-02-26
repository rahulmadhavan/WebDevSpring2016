/**
 * Created by rahulk on 2/23/16.
 */
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("HomeController", HomeController);

    function HomeController($scope, MsgBusService) {
        MsgBusService.emitMsg('homeView')
    }
})();
