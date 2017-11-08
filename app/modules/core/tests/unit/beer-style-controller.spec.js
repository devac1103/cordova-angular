'use strict';

describe('Controller: BeerStyleController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var BeerStyleController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        BeerStyleController = $controller('BeerStyleController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
