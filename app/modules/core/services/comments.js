'use strict';

/**
 * @ngdoc service
 * @name core.Services.Comments
 * @description Comments Service interacts with parse to manage comments
 */
angular
    .module('core')
    .service('Comments', [
        'Parse',
        function(parseLib) {
            /**
             * Saves a comment and associates the current user
             * @param commentValue - Comment body
             * @todo Abstract comment_type, as of now there is only one
             */
            this.save = function(commentValue){
                var comment = parseLib.new('Comment');
                comment.set('comment',commentValue);
                comment.set('user',parseLib.getUser());
                comment.set('comment_type','Missing Beer');
                return parseLib.save(comment);
            };
        }
    ]);
