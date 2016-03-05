/**
 * Created by rahulk on 3/3/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .controller('EventController', EventController);

    function EventController($scope) {
        $scope.disqusConfig = {
            disqus_shortname: 'project-cs5610-rahulmadhavan21',// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
            disqus_identifier: '/project/index.html#/event',// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
            disqus_url: 'http://localhost:3000/project/index.html#/event'// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        };
    }
})();

