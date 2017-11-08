/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
/* global launchnavigator */
'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.ViewBreweryController
 * @description ViewBreweryController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('ViewBreweryController', [
        '$scope',
        '$stateParams',
        '$location',
        'BreweryService',
        'LocationService',
        'HoursOfOperationService',
        'BeerService',
        'MapCalc',
        'Specials',
        function($scope,$params,$location,BreweryService,LocationService,HoursOfOperation,BeerService,MapCalc,Specials) {

            var brewery_id = $params.brewery_id.replace('/','');
            $scope.beers = null;
            $scope.specials = null;
            
            $scope.distance = 'loading...';
            
            var calcDistance = function (lat, lon) {
                return MapCalc.distance(lat, lon, $scope.currentLocation.coords.latitude, $scope.currentLocation.coords.longitude);
            };
            
            Specials.getForBrewery(brewery_id).then(function(specials){
                $scope.specials = specials;
            });
            
            BreweryService.get(brewery_id).then(function(brewery){
                $scope.brewery = brewery[0];
                
                if( $scope.brewery.get('Pay') === true ){
                    BreweryService.getOnTap($scope.brewery).then(function(beers){
                        $scope.beers = beers; 
                        $scope.$apply();
                    });
                }
                
                LocationService.getPosition().then(function(pos){
                    $scope.currentLocation = pos;
                    $scope.distance = calcDistance($scope.brewery.get('geolat'),$scope.brewery.get('geolong')).toFixed(2) + ' mi.';
                    $scope.$apply();
                },function(err){
                    console.log(err);
                    $scope.distance = '';
                    $scope.$apply();
                });
                
                $scope.$apply();
            },function(err){
                window.history.back();
            });

            $scope.navigateTo = function (lat, lon) {
                LocationService.getPosition().then(function(pos){
                launchnavigator.navigate(
                    [lat, lon],
                    [pos.coords.latitude,pos.coords.longitude],
                    function () {
                        console.log('Yay');
                    }, function (err) {
                        console.log(err);
                    });
                });
            };
            
            $scope.getHoursMessage = function(brewery){
                return HoursOfOperation.getHoursMessage(brewery);
            };
            
            $scope.hasKitchen = function(brewery){
                return BreweryService.hasKitchen(brewery);
            };
            
            $scope.showBeer = function (beer_id) {
                BeerService.get(beer_id).then(function(beer){
                    $location.path('/beer/' + beer_id);
                    $scope.$apply();
                },function(err){
                    console.log(err);
                });
            };
        }
    ]);
