/**
 * Created by rahulk on 4/19/16.
 */
module.exports = function(app, Event) {
    'use strict';

    app.get('/api/project/event/user/:userId', findAllEventsForUser);
    app.get('/api/project/event/:eventId', findEventById);
    app.delete('/api/project/event/:eventId', deleteEventById);
    app.post('/api/project/event/hike/:hikeId', createEvent);
    app.put('/api/project/event/:eventId', updateEventById);
    app.put('/api/project/event/:eventId/user', addUsersToEvent);
    app.delete('/api/project/event/:eventId/user/:userId', removeUsersFromEvent);

    function findAllEventsForUser(req, res) {
        var userId = req.params.userId;
        Event.findAllEventsForUser(userId)
            .then(function(events) {
                res.json(events);
            });
    }

    function findEventById(req, res) {
        var eventId = req.params.eventId;
        Event.getEventById(eventId)
            .then(function(event) {
                res.json(event);
            });
    }

    function deleteEventById(req, res) {
        var userId = req.params.userId;
        var eventId = req.params.eventId;
        Event.deleteEventById(userId, eventId)
            .then(function(events) {
                res.json(events);
            });
    }

    function createEvent(req, res) {
        var eventBody = req.body;
        var hikeId = req.params.hikeId;
        Event.createEvent(eventBody, hikeId)
            .then(function(event) {
                res.json(event);
            });
    }

    function updateEventById(req, res) {
        var eventId = req.params.eventId;
        var hikeBody = req.body;
        Event.updateEventById(eventId, hikeBody)
            .then(function(event) {
                res.json(event);
            });
    }

    function addUsersToEvent(req,res) {
        var userIds = req.body;
        var eventId = req.params.eventId;
        Event.addUsersToEvent(eventId, userIds)
            .then(function(event) {
                res.json(event);
            });
    }

    function removeUsersFromEvent(req,res) {
        var eventId = req.params.eventId;
        var userId = req.params.userId;
        Event.removeUserFromEvent(eventId, userId)
            .then(function(event) {
                res.json(event);
            });
    }

};
