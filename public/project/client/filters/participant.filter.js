/**
 * Created by rahulk on 4/21/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .filter('participantsWithoutUser', ParticipantFilter);

    function ParticipantFilter() {
        return function(participants, user) {
            if (participants !== undefined) {
                return participants.filter(function (participant) {
                    return participant._id !== user._id;
                });
            } else {
                return [];
            }
        };
    }
})();
