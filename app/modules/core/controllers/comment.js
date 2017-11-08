'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.CommentController
 * @description CommentController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('CommentController', [
        '$scope',
        'Comments',
        function($scope,comments) {            
            
            $scope.comment = { value:'' };
            
            $scope.saveComment = function(){
                if( $scope.comment.value == '' ){
                    alert('Please enter a comment');
                    return false;
                }    
                
                comments.save($scope.comment.value).then(function(result){
                    alert('Your comment was successfully submitted. Thank you for your feedback!');  
                    window.history.back();
                },function(err){
                    alert('There was an issue submitting your comment. Please try again later.');
                });
            };
        }
]);
