/**
 * Created by rahulk on 2/25/16.
 */
(function()
{
    angular
        .module("FormBuilderApp")
        .factory("MsgBusService",MsgBusService);

    function MsgBusService($rootScope) {
        var msgBus = {};

        msgBus.emitMsg = function(msg, data) {
            data = data || {}
            $rootScope.$emit(msg, data);
        };

        msgBus.onMsg = function(msg, func, scope) {
            var unbind = $rootScope.$on(msg, func);
            if (scope) {
                scope.$on('$destroy', unbind);
            }
        };

        return msgBus;
    }
})();