/**
 * Created by rahulk on 3/1/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .controller('HikeController', HikeController);

    function HikeController($scope) {
        $scope.disqusConfig = {
            disqus_shortname: 'project-cs5610-rahulmadhavan21',// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
            disqus_identifier: '/project/index.html#/hike',// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
            disqus_url: 'http://localhost:3000/project/index.html#/hike'// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        };
    }
})();

