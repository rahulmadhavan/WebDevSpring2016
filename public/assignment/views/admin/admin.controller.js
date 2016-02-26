/**
 * Created by rahulk on 2/23/16.
 */
(function()
{
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, MsgBusService) {
        MsgBusService.emitMsg('adminView')
    }
})();
