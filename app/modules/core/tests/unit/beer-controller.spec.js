'use strict';

describe('Controller: BeerController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var BeerController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        BeerController = $controller('BeerController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
