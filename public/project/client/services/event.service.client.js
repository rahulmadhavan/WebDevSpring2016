/**
 * Created by rahulk on 4/19/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .factory('EventService', EventService);

    function EventService($http) {

        var service = {
            createEvent:createEvent,
            findAllEventsForUser:findAllEventsForUser,
            getEventById:getEventById,
            inviteUsersToEvent:inviteUsersToEvent,
            updateEventById:updateEventById,
            removeUserFromEvent:removeUserFromEvent,
            deleteEvent:deleteEvent
        };

        return service;

        function createEvent(event, hikeId) {
            return $http.post('/api/project/event/hike/' + hikeId, event);
        }

        function findAllEventsForUser(userId) {
            return $http.get('/api/project/event/user/' + userId);
        }

        function getEventById(eventId) {
            return $http.get('/api/project/event/' + eventId);
        }

        function inviteUsersToEvent(eventId, users) {
            return $http.put('/api/project/event/' + eventId + '/user', users);
        }

        function updateEventById(eventId, event) {
            return $http.put('/api/project/event/' + eventId, event);
        }

        function removeUserFromEvent(eventId, userId) {
            return $http.delete('/api/project/event/' + eventId + '/user/' + userId);
        }

        function deleteEvent(eventId) {
            return $http.delete('/api/project/event/' + eventId);
        }
    }
})();
