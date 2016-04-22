/**
 * Created by rahulk on 4/17/16.
 */
var q = require('q');
module.exports = function (HikeModel) {
    'use strict';

    var Hike = {
        getHikeById:getHikeById,
        createHike:createHike,
        findAllHikes:findAllHikes,
        deleteHikeById:deleteHikeById,
        updateHikeById:updateHikeById
    };

    return Hike;

    function getHikeById(hikeId) {
        var deferred = q.defer();
        getHikeByIdDeferred(deferred, hikeId);
        return deferred.promise;
    }

    function getHikeByIdDeferred(deferred, hikeId) {
        //console.log('getting hike');
        //console.log(hikeId);
        HikeModel.findById(hikeId, function(err, hike) {
            if (err) {
                deferred.reject(err);
            } else {
                //console.log('received hike');
                //console.log(hike);
                deferred.resolve(hike);
            }
        });
    }

    function createHike(hike) {
        delete hike._id;
        var deferred = q.defer();
        //console.log('updated hike');
        //console.log(hike);
        HikeModel.create(hike, function(err, hike) {
            if (err) {
                deferred.reject(err);
            } else {
                //console.log('newly created hike');
                //console.log(hike);
                deferred.resolve(hike);
            }
        });
        return deferred.promise;
    }

    function findAllHikes() {
        var deferred = q.defer();
        findAllHikesDeferred(deferred);
        return deferred.promise;
    }

    function deleteHikeById(hikeId) {
        var deferred = q.defer();
        HikeModel.remove({_id: hikeId}, function(err, status) {
            if (err) {
                deferred.reject(err);
            } else {
                findAllHikesDeferred(deferred);
            }
        });
        return deferred.promise;
    }

    function findAllHikesDeferred(deferred) {
        var query = HikeModel.find();
        query.exec(function(err, hikes) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(hikes);
            }
        });
    }

    function updateHikeById(hikeId, newHike) {
        var deferred = q.defer();
        delete newHike._id;
        var hikeFields = {$set:newHike};
        //console.log('updated hike');
        //console.log(hikeId);
        //console.log(hikeFields);
        HikeModel.findByIdAndUpdate(hikeId, hikeFields, function(err, hike) {
            if (err) {
                deferred.reject(err);
            } else {
                //console.log('hike successfull');
                getHikeByIdDeferred(deferred, hikeId);
            }
        });
        return deferred.promise;
    }

};
