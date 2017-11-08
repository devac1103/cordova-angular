'use strict';

/**
 * @ngdoc service
 * @name core.Services.BreweryService
 * @description BreweryService Service interacts with Parse to manage brewery (Client) data
 */
angular
    .module('core')
    .service('BreweryService',['Parse',function(parseLib){

        this.currentBrewery = null;
        /**
         * Determines if the provided brewery has a kitchen
         * @param brewery - Parse 'Client' object
         */
        this.hasKitchen = function(brewery){
            var kitchenHours = brewery.get('kitchenCloseTime');
            
            var hasKitchen = false;
            
            angular.forEach(kitchenHours,function(hours,day){
                if( hours != 'closed' ){
                    hasKitchen = true;
                } 
            });
            
            return hasKitchen;
        };
        /**
         * Returns beers on tap for the provided brewery
         * @param brewery - Parse 'Client' object
         */
        this.getOnTap = function(brewery){
            var beers = brewery.get('ontap');
            var beerIds = [];
            angular.forEach(beers,function(beer,index){
                 beerIds.push(beer.id);
            });
            
            return parseLib.getWhereIn('Beer','objectId',beerIds);
        };
        /**
         * Setter for the current brewery
         * @param brewery - Parse 'Client' object
         */
        this.setCurrentBrewery = function(brewery){
            this.currentBrewery = brewery;
        };
        /**
         * Getter for the current brewery
         */
        this.getCurrentBrewery = function(){
            return this.currentBrewery;
        };
        /**
         * Returns a promise from retrieving a Client from the provided brewery id
         * @param {string} brewery_id - Parse id from the Client you want information for
         */
        this.get = function(brewery_id){
            return parseLib.get('Client',brewery_id);
        };
        /**
         * Returns a promise that contains all of the Clients near the device
         */
        this.nearMe = function(){
            return parseLib.getAll('Client');
        };
        /**
         * Returns a promise that contains all of the Clients that are flagged
         * as breweries in Parse.
         */
        this.breweries = function(){
            return parseLib.getWhere('Client',{'brew':true});
        };
        /**
         * Returns a promise that contains all of the Clients that are flagged
         * as having food in Parse.
         */
        this.pubsNGrub = function(){
            return parseLib.getWhere('Client',{'food':true});
        };
    }]);
