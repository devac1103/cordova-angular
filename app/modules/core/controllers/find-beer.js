'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.FindBeerController
 * @description FindBeerController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('FindBeerController', [
        '$scope',
        '$location',
        'BeerService',
        function($scope,$location,BeerService) {
            
            $scope.beers = [];
            $scope.loadingBeers = true;
            $scope.refreshingBeers = false;
            
            BeerService.getAll().then(function(beers){
                $scope.beers = beers;
                $scope.loadingBeers = false; 
                $scope.$apply();
            });
            
            $scope.showBeer = function(beer_id){
                $location.path('/beer/' + beer_id); 
            };
            
            $scope.updateBeers = function(searchTerm){
                $scope.refreshingBeers = true;
                
                if( searchTerm ){
                    BeerService.search(searchTerm).then(function(beers){
                        $scope.beers = beers;
                        $scope.refreshingBeers = false; 
                        $scope.$apply();
                    });
                } else {
                    BeerService.getAll().then(function(beers){
                        $scope.beers = beers;
                        $scope.refreshingBeers = false; 
                        $scope.$apply();
                    });
                }
            };
            
            $scope.sort = function(){
                $('.find-beer-row').tsort({attr:'data-full-name'});
            }
        }
]);

