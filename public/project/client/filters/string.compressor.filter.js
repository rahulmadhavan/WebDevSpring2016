/**
 * Created by rahulk on 4/26/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .filter('stringCompressor', StringCompressorFilter);

    function StringCompressorFilter() {
        var MAX_STRING_LENGTH = 50;
        return function (s) {
            if (s !== undefined) {
                if (s.length > 50) {
                    return s.substring(0,50) + '...';
                } else {
                    return s;
                }
            }
            return s;
        };
    }
})();
