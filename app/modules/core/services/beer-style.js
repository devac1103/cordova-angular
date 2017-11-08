'use strict';

/**
 * @ngdoc service
 * @name core.Services.BeerStyle
 * @description BeerStyle Service
 */
angular
    .module('core')
    .service('BeerStyle', [
        'Parse',
        function(parse) {
            /**
             * Returns the BeerStyles object for the provided beer
             * @param {ParseObject} beer - Beer for which to get the style
             */
            this.getForBeer = function(beer){
                //Null values have been observed, be sure that is checked
                //before making this call
                return parse.getWhere('BeerStyles',{'style':beer.get('styleId')});
            };
            /**
             * Retrieves a specific style from the provided style id
             * @param {string} style_id - Style id for which to get information from Parse
             */
            this.get = function(style_id){
                return parse.getWhere('BeerStyles',{'objectId':style_id});
            };
        }
    ]);
