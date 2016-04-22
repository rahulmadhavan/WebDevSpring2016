/**
 * Created by rahulk on 4/17/16.
 */
module.exports = function(app, Hike) {
    'use strict';

    app.get('/api/project/hike', findAllHikes);
    app.get('/api/project/hike/:hikeId', findHikeById);
    app.delete('/api/project/hike/:hikeId', deleteHikeById);
    app.post('/api/project/hike', createHike);
    app.put('/api/project/hike/:hikeId', updateHikeById);

    function findAllHikes(req, res) {
        Hike.findAllHikes()
            .then(function(hikes) {
                res.json(hikes);
            });
    }

    function findHikeById(req, res) {
        var hikeId = req.params.hikeId;
        Hike.getHikeById(hikeId)
            .then(function(hike) {
                res.json(hike);
            });
    }

    function deleteHikeById(req, res) {
        var hikeId = req.params.hikeId;
        Hike.deleteHikeById(hikeId)
            .then(function(hikes) {
                res.json(hikes);
            });
    }

    function createHike(req, res) {
        var hikeBody = req.body;
        Hike.createHike(hikeBody)
            .then(function(hike) {
                res.json(hike);
            });
    }

    function updateHikeById(req, res) {
        var hikeId = req.params.hikeId;
        var hikeBody = req.body;
        Hike.updateHikeById(hikeId, hikeBody)
            .then(function(hike) {
                res.json(hike);
            });
    }

};
