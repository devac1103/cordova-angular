'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.BeerStyleController
 * @description BeerStyleController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('BeerStyleController', [
        '$scope',
        '$stateParams',
        '$location',
        'BeerService',
        'BeerStyle',
        function($scope,$params,$location,beers,beerStyle) {
            /**
             * Private variable that represents the style id parsed
             * from the URL
             */
            var style_id = $params.style_id.replace('/','');
            
            /**
             * Style to display
             */
            $scope.style = null;
            
            /**
             * List of beers to display that have the same style
             */
            $scope.beers = null;
            
            /**
             * Retrieves the style for the provided style id parameter and stores
             * it in the scope
             */
            beerStyle.get(style_id).then(function(style){
                $scope.style = style[0];
                $scope.$apply(); 
                /**
                 * Retrieves beers that share the style that was found from the parameter
                 * in the URL
                 */
                beers.withStyle($scope.style.get('style')).then(function(beers){
                    $scope.beers = beers;
                    $scope.$apply();
                });
            });
            
            /**
             * Redirects the user to the page that shows the provided beer id
             * @param {string} beer_id
             */
            $scope.showBeer = function (beer_id) {
                beers.get(beer_id).then(function(beer){
                    $location.path('/beer/' + beer_id);
                    $scope.$apply();
                },function(err){
                    console.log(err);
                });
            };
        }
]);
