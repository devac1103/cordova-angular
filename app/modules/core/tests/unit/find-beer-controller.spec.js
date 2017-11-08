'use strict';

describe('Controller: FindBeerController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var FindBeerController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        FindBeerController = $controller('FindBeerController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
