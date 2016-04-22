/**
 * Created by rahulk on 4/21/16.
 */
(function() {
    'use strict';

    angular
        .module('PlanMyHikeApp')
        .filter('gravatarUrl', GravatarUrlFilter);

    function GravatarUrlFilter() {
        return function(email, imageSize) {
            return getGravatarImageURL(email, imageSize);
        };

        function getGravatarImageURL (email, size, defaultImage, allowedRating, forceDefault) {
            email = typeof email !== 'undefined' ? email : 'default';
            size = (size >= 1 && size <= 2048) ? size : 80;
            defaultImage = typeof defaultImage !== 'undefined' ? defaultImage : 'mm';
            allowedRating = typeof allowedRating !== 'undefined' ? allowedRating : 'x';
            forceDefault = forceDefault === true ? 'y' : 'n';

            return ('https://secure.gravatar.com/avatar/' +
            md5(email.toLowerCase().trim()) + '?size=' + size +
            '&default=' + encodeURIComponent(defaultImage) +
            '&rating=' + allowedRating +
            (forceDefault === 'y' ? '&forcedefault=' + forceDefault : ''));
        }
    }
})();
