/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.BeerControllerController
 * @description BeerControllerController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('BeerController', [
        '$scope','$location','$rootScope','BeerService','FavoriteBeerService',
        function($scope,$location,$rootScope,BeerService,FavoriteBeerService) {
            /**
             * Beers to be displayed on the page
             */
            $scope.beers = null;
            
            /**
             * Shows a list of beers returned from various functions
             * @param {array} results - Response from a promise that contains an array of beer objects
             */
            $scope.showList = function(results){
                $scope.beers = results;
                $scope.$apply();
            };
            /**
             * Updates the current user's favorite beers
             * @param {string} action - Providing 'add' adds the provided beer id to the user's favorites, anything else will remove it
             * @param {string} beer_id - Beer to add to the user's favorites
             */
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
            /**
             * Redirects the user to view the beer found from the provided beer id
             * @param {string} beer_id - Beer to redirect to
             */
            $scope.showBeer = function (beer_id) {
                BeerService.get(beer_id).then(function(beer){
                    $location.path('/beer/' + beer_id);
                    $rootScope.$apply();
                },function(err){
                    console.log(err);
                });
            };
            
            /**
             * Promise provided for the show list function
             */
            var beerPromise = null;
            
            /**
             * Router for other pages that this controller works with
             */
            if( $location.url() == '/favorites' ){
                beerPromise = BeerService.favorites();
            } else if( $location.url() == '/on-tap' ){
                beerPromise = BeerService.onTap();
            } else if( $location.url() == '/locally-brewed' ){
                beerPromise = BeerService.locallyBrewed();
            }
            
            beerPromise.then($scope.showList); //Display the beers that were returned based on the URL
            
            /**
             * Sets up the user with a favorite beer object if there isn't one, sets the current
             * favorites array to the found one if available
             */
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
        }
]);

