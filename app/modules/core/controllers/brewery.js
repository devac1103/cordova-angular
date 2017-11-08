/* global launchnavigator */
'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.BreweriesController
 * @description BreweriesController
 * @requires ng.$scope
 */
angular
    .module('core')
    .controller('BreweriesController', [
        '$scope', '$rootScope', '$location', 'BreweryService', 'MapCalc', 'LocationService','HoursOfOperationService',
        function ($scope, $rootScope, $location, BreweryService, MapCalc, LocationService, hoursOfOperation) {
            
            $scope.currentLocation = null;
            $scope.showBack = true;
            $scope.locationStatus = {'type':'info','message':'Finding your location...'};

            $scope.navigateTo = function (lat, lon) {
                launchnavigator.navigate(
                    [lat, lon],
                    [$scope.currentLocation.coords.latitude,$scope.currentLocation.coords.longitude],
                    function () {
                        console.log('Yay');
                    }, function (err) {
                        console.log(err);
                    });
            };

            $scope.showList = function (results) {
                $scope.breweries = results;
                $rootScope.$apply();
                $scope.sortList('.brewery-list');
            };

            $scope.refreshCurrentPosition = function () {

                var success = function (pos) {
                    $scope.currentLocation = pos;
                    $rootScope.$apply();
                    $scope.sortList('.brewery-list');
                };

                var error = function (err) {
                    console.log('Position Error.....');
                    console.log(err);
                };

                return LocationService.getPosition().then(success, error);
            };

            $scope.calcDistance = function (lat, lon) {
                return MapCalc.distance(lat, lon, $scope.currentLocation.coords.latitude, $scope.currentLocation.coords.longitude);
            };

            $scope.showBrewery = function (brewery_id) {
                BreweryService.get(brewery_id).then(function(brewery){
                    $location.path('/brewery/' + brewery_id);
                    $rootScope.$apply();
                },function(err){
                    console.log(err);
                });
            };

            $scope.sortList = function (selector) {
                var parent$ = $(selector);
                parent$.find("li").detach().sort(function (a, b) {
                    return (parseFloat(a.getAttribute('data-sorter')) - parseFloat(b.getAttribute('data-sorter')));
                }).each(function (index, el) {
                    parent$.append(el);
                });
            };

            $scope.getHoursMessage = function(brewery){
                return hoursOfOperation.getHoursMessage(brewery);
            };

            $scope.hasKitchen = function(brewery){
                return BreweryService.hasKitchen(brewery);
            };

            LocationService.getPosition().then(function (pos) {
                $scope.currentLocation = pos;

                var breweryPromise = null;

                if ($location.url() == '/near-me') {
                    breweryPromise = BreweryService.nearMe();
                } else if ($location.url() == '/breweries') {
                    breweryPromise = BreweryService.breweries();
                } else if ($location.url() == '/pubs-n-grub') {
                    breweryPromise = BreweryService.pubsNGrub();
                }

                breweryPromise.then($scope.showList);

            }, function (err) {
                $scope.locationStatus = {'type':'danger','message':'Could not get your position!'};
            });
        }
    ]);
