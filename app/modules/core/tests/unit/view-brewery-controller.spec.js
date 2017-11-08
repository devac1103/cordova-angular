'use strict';

describe('Controller: ViewBreweryController', function() {

    //Load the ui.router module
    beforeEach(module('ui.router'));
    //Load the module
    beforeEach(module('core'));

    var ViewBreweryController,
        scope;

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ViewBreweryController = $controller('ViewBreweryController', {
        $scope: scope
        });
    }));

    it('should ...', function() {

    });
});
