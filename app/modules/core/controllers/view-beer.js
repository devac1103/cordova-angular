'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.ViewBeerController
 * @description ViewBeerController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('ViewBeerController', [
        '$scope',
        '$stateParams',
        '$rootScope',
        '$location',
        'BeerService',
        'FavoriteBeerService',
        'BeerStyle',
        function($scope,$params,$rootScope,$location,BeerService,FavoriteBeerService,BeerStyle) {
            
            var beer_id = $params.beer_id.replace('/','');
            
            $scope.currentBeer = null;
            $scope.onTapBreweries = [];
            
            BeerService.getOnTapFromBeer(beer_id).then(function(onTapBreweries){
                $scope.onTapBreweries = onTapBreweries;
                $scope.$apply();
            },function(err){
                console.log(err);
            });
            
            BeerService.get(beer_id).then(function(beer){
                $scope.currentBeer = beer[0];
                
                BeerStyle.getForBeer($scope.currentBeer).then(function(style){
                    $scope.style = style[0];
                    $scope.$apply();
                });
                
                $scope.$apply();
            });
            
            FavoriteBeerService.get($rootScope.currentUser).then(function(favorites){
            	if( favorites.length == 0 ){
            		//create a new one
                    FavoriteBeerService.new($rootScope.currentUser).then(function(favorites){
                        $scope._favoriteBeers = favorites[0];
                        $scope.favorites = [];
                        $scope.$apply(); 
                    });
            	} else {
            		$scope._favoriteBeers = favorites[0];
                	$scope.favorites = favorites[0].get('favoriteBrews');
                	$scope.$apply();
            	}
            },function(err){
            	console.log(err);
            });
            
            $scope.favorite = function(action,beer_id){
            	//redirect to login if not logged in
            	action == 'add' ? 
            			$scope.favorites.push(beer_id) : 
            			$scope.favorites.splice($scope.favorites.indexOf(beer_id),1);
            			
            	FavoriteBeerService.save($scope._favoriteBeers).then(function(response){
            		$scope._favoriteBeers = response;
            		$scope.$apply();
            	},function(err){
            		console.log(err);
            	});
            };
            
            $scope.go = function(path){
                $location.path(path);
            };
        }
]);
