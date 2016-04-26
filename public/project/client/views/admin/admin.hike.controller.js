/**
 * Created by rahulk on 4/16/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .controller('AdminHikeController', AdminHikeController);

    function AdminHikeController($scope, HikeService) {
        initialize();
        $scope.sortType      = 'name';
        $scope.sortReverse   = false;
        $scope.operationType = 'CREATE';
        $scope.upsertHikeModel = {};

        $scope.remove = remove;
        $scope.upsertHike = upsertHike;
        $scope.edit = edit;
        $scope.create = create;

        function initialize() {
            HikeService
                .findAllHikes()
                .then(handleResponse, handleError);
        }

        function remove(hike) {
            HikeService
                .deleteHikeById(hike._id)
                .then(handleSuccess, handleError);
        }

        function create() {
            $scope.operationType = 'CREATE';
            $scope.upsertHikeModel = {};
        }

        function edit(hike) {
            $scope.operationType = 'UPDATE';
            $scope.upsertHikeModel = hike;
        }

        function upsertHike(hike) {
            if ($scope.operationType === 'UPDATE') {
                HikeService
                    .updateHike(hike._id, hike)
                    .then(handleSuccess, handleError);
            } else {
                $scope.operationType = 'CREATE';
                hike = $scope.upsertHikeModel;
                HikeService
                    .createHike(hike)
                    .then(handleSuccess, handleError);
            }
            $scope.upsertHikeModel = {};
        }

        function handleResponse(response) {
            $scope.hikes = response.data.map(function(h) {
                //if (u.roles !== undefined) {
                //    u.roles = u.roles.join(', ');
                //} else {
                //    u.roles = '';
                //}
                return h;
            });
            $scope.selectedUser = undefined;
        }

        function handleSuccess(response) {
            initialize();
        }

        function handleError(error) {
            $scope.error = error;
        }
    }
})();
