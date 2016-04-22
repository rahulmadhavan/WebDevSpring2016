var q = require('q');
module.exports = function (EventModel) {
    'use strict';

    var Event = {
        getEventById:getEventById,
        createEvent:createEvent,
        findAllEventsForUser:findAllEventsForUser,
        deleteEventById:deleteEventById,
        updateEventById:updateEventById,
        addUsersToEvent:addUsersToEvent,
        removeUserFromEvent:removeUserFromEvent
    };

    return Event;

    function getEventById(eventId) {
        var deferred = q.defer();
        getEventByIdDeferred(deferred, eventId);
        return deferred.promise;
    }

    function getEventByIdDeferred(deferred, eventId) {
        var query = EventModel
            .findById(eventId)
            .populate('createdBy hike participants');
        query.exec(function(err, event) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(event);
            }
        });
    }

    function createEvent(event, hikeId) {
        delete event._id;
        var deferred = q.defer();
        event.participants = [event.createdBy];
        event.hike = hikeId;
        event.todo = {
            done:[],
            pending:[]
        };
        EventModel.create(event, function(err, newEvent) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(newEvent);
            }
        });
        return deferred.promise;
    }

    function findAllEventsForUser(userId) {
        var deferred = q.defer();
        findAllEventsForUserDeferred(deferred, userId);
        return deferred.promise;
    }

    function deleteEventById(userId, eventId) {
        var deferred = q.defer();
        EventModel.remove({_id: eventId}, function(err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                findAllEventsForUserDeferred(deferred, userId);
            }
        });
        return deferred.promise;
    }

    function findAllEventsForUserDeferred(deferred, userId) {
        var query = EventModel
            .find({'participants':userId})
            .populate('createdBy hike')
            .sort({eventDate: -1});
        query.exec(function(err, events) {
            if (err) {
                console.log('error');
                console.log(err);
                deferred.reject(err);
            } else {
                console.log('events');
                console.log(events);
                deferred.resolve(events);
            }
        });
    }

    function updateEventById(eventId, newEvent) {
        var deferred = q.defer();
        delete newEvent._id;
        var eventFields = {$set:newEvent};
        updateEventDeferred(eventId, eventFields, deferred);
        return deferred.promise;
    }

    function addUsersToEvent(eventId, userIds) {
        var deferred = q.defer();
        var eventFields = {$addToSet:{participants:{$each: userIds}}};
        updateEventDeferred(eventId, eventFields, deferred);
        return deferred.promise;
    }

    function removeUserFromEvent(eventId, userId) {
        var deferred = q.defer();
        var eventFields = {$pull:{participants:userId}};
        updateEventDeferred(eventId, eventFields, deferred);
        return deferred.promise;
    }

    function updateEventDeferred(eventId, eventFields, deferred) {
        EventModel.findByIdAndUpdate(eventId, eventFields, function(err, event) {
            if (err) {
                deferred.reject(err);
            } else {
                getEventByIdDeferred(deferred, eventId);
            }
        });
    }
};
