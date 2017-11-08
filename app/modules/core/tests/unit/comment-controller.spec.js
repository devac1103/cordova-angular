'use strict';

describe('Controller: CommentController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var CommentController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        CommentController = $controller('CommentController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
