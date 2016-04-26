/**
 * Created by rahulk on 3/3/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .controller('EventController', EventController);

    function EventController($scope, $rootScope, $routeParams, $location,
                             EventService, UserService) {
        $scope.eventId = $routeParams.eventId;
        $scope.disqusConfig = {
            disqus_shortname: 'project-cs5610-rahulmadhavan21',// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
            disqus_identifier: '/project/index.html#/event/' + $scope.eventId,// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
            disqus_url: 'http://localhost:3000/project/index.html#/event/' + $scope.eventId// jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
        };

        $scope.event = {};
        $scope.newTodo = '';
        $scope.userSearchText = '';
        $scope.userSearchResults = [];

        $scope.removeDoneTodo = removeDoneTodo;
        $scope.removePendingTodo = removePendingTodo;
        $scope.doneTodo = doneTodo;
        $scope.redoTodo = redoTodo;
        $scope.addTodo = addTodo;
        $scope.isCurrentUserCreator = isCurrentUserCreator;
        $scope.isParticipantCurrentUser = isParticipantCurrentUser;
        $scope.isParticipantInvited = isParticipantInvited;
        $scope.searchUsers = searchUsers;
        $scope.inviteUser = inviteUser;
        $scope.removeUser = removeUser;
        $scope.deleteEvent = deleteEvent;
        $scope.clearSearchResults = clearSearchResults;
        $scope.updateEventDate = updateEventDate;

        initialize();

        function initialize() {
            EventService
                .getEventById($scope.eventId)
                .then(success, failure);

            function success(response) {
                if (response.data) {
                    $scope.event = response.data;
                }
            }

            function failure(response) {
                console.log('Event controller initialization failed');
            }
        }

        function addTodo() {
            $scope.event.todos.pending.push($scope.newTodo);
            $scope.newTodo = '';
            updateEventTodo();
        }

        function redoTodo(index) {
            var todoItem = $scope.event.todos.done[index];
            removeDoneTodo(index);
            $scope.event.todos.pending.push(todoItem);
            updateEventTodo();
        }

        function doneTodo(index) {
            var todoItem = $scope.event.todos.pending[index];
            removePendingTodo(index);
            $scope.event.todos.done.push(todoItem);
            updateEventTodo();
        }

        function removeDoneTodo(index) {
            $scope.event.todos.done.splice(index, 1);
            updateEventTodo();
        }

        function removePendingTodo(index) {
            $scope.event.todos.pending.splice(index, 1);
            updateEventTodo();
        }

        function updateEventTodo() {
            updateEvent({todos:$scope.event.todos});
        }

        function updateEvent(event) {
            EventService
                .updateEventById($scope.eventId, event)
                .then(success, failure);

            function success(response) {
                if (response.data) {
                    $scope.event = response.data;
                }
            }

            function failure(response) {
                console.log('Event controller initialization failed');
            }
        }

        function isCurrentUserCreator() {
            var currentUser = $rootScope.user;
            if ($scope.event !== undefined &&
                $scope.event.createdBy !== undefined &&
                currentUser !== undefined &&
                currentUser != null) {
                return currentUser._id === $scope.event.createdBy._id;
            } else {
                return false;
            }
        }

        function isParticipantCurrentUser(participant) {
            var currentUser = $rootScope.user;
            if (participant !== undefined && currentUser !== undefined && currentUser != null) {
                return currentUser._id === participant._id;
            } else {
                return false;
            }
        }

        function isParticipantInvited(participant) {
            return $scope.event.participants.some(function(p) {
                return p._id === participant._id;
            });
        }

        function searchUsers() {
            var searchText = $scope.userSearchText;
            UserService
                .findUsersByUsernameOrEmail(searchText)
                .then(success, failure);

            function success(response) {
                if (response.data) {
                    if (response.data !== undefined) {
                        $scope.userSearchResults = response.data;
                    } else {
                        $scope.userSearchResults = [];
                    }
                }
            }

            function failure(response) {
                console.log('Event controller initialization failed');
            }
        }

        function inviteUser(user) {
            EventService
                .inviteUsersToEvent($scope.event._id,[user._id])
                .then(success, failure);

            function success(response) {
                if (response.data) {
                    $scope.event = response.data;
                }
            }

            function failure(response) {
                console.log('Event controller initialization failed');
            }
        }

        function removeUser(user) {
            EventService
                .removeUserFromEvent($scope.event._id, user._id)
                .then(success, failure);

            function success(response) {
                if (response.data) {
                    $scope.event = response.data;
                }
            }

            function failure(response) {
                console.log('Event controller initialization failed');
            }
        }

        function deleteEvent(event) {
            EventService
                .deleteEvent(event._id)
                .then(success, failure);

            function success(response) {
                $location.path('/events');
            }

            function failure(response) {
                console.log('Event controller initialization failed');
            }
        }

        function clearSearchResults() {
            $scope.userSearchText = '';
            $scope.userSearchResults = [];
        }

        function updateEventDate() {
            updateEvent({eventDate:$scope.updatedEventDate});
        }

    }
})();

