/**
 * Created by rahulk on 4/17/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .factory('HikeService', HikeService);

    function HikeService($http) {

        var service = {
            createHike:createHike,
            findAllHikes:findAllHikes,
            findHikeById:findHikeById,
            updateHike:updateHike,
            deleteHikeById:deleteHikeById
        };

        return service;

        function findAllHikes() {
            return $http.get('/api/project/hike');
        }

        function findHikeById (hikeId) {
            return $http.get('/api/project/hike/' + hikeId);
        }

        function createHike(hike) {
            return $http.post('/api/project/hike', hike);
        }

        function deleteHikeById(hikeId) {
            return $http.delete('/api/project/hike/' + hikeId);
        }

        function updateHike(hikeId, hike) {
            return $http.put('/api/project/hike/' + hikeId, hike);
        }
    }
})();

