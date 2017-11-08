'use strict';

describe('Controller: ViewBeerController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var ViewBeerController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ViewBeerController = $controller('ViewBeerController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
