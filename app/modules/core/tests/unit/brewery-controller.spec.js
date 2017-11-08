'use strict';

describe('Controller: BreweryController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var BreweryController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        BreweryController = $controller('BreweryController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
