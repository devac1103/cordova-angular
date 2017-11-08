'use strict';

/**
 * @ngdoc service
 * @name core.Services.BeerService
 * @description BeerService Service interacts with parse to manage data about beers
 */
angular
    .module('core')
    .service('BeerService',[
        'Parse',
        'FavoriteBeerService',
        '$rootScope',
        function(parseLib,favoriteBeers,$scope){
                
        this.currentBeer = null;
        /**
         * Setter for the currentBeer property
         * @param {ParseObject} beer
         */
        this.setCurrentBeer = function(beer){
            this.currentBeer = beer;
        };
        /**
         * Getter for the currentBeer property
         */
        this.getCurrentBeer = function(){
            return this.currentBeer;
        };
        /**
         * Returns a promies that contains all of the Beer objects up to the limit
         * set in the parse library
         */
        this.getAll = function(){
            return parseLib.getAll('Beer','full_name');
        };
        /**
         * Returns a promise that contains information about the Beer found by the
         * provided beer id
         * @param {string} beer_id - Parse id for the beer you want information about
         */
        this.get = function(beer_id){
            return parseLib.get('Beer',beer_id);
        };
        /**
         * Returns a promise that contains Beers that contain the provided search term
         * @param {string} search_term
         */
        this.search = function(search_term){
            return parseLib.cloud('beerSearch',{'searchTerm':search_term});
        };
        /**
         * Returns a promise that contains Clients that have the provided beer_id on tap
         * @param {string} beer_id
         */
        this.getOnTapFromBeer = function(beer_id){
            return parseLib.cloud('getOnTapBreweries',{'beer_id':beer_id});  
        };
        /**
         * Returns the current user's favorite beers
         */
        this.favorites = function(){
            return favoriteBeers.get($scope.currentUser).then(function(response){
                var favBeers = response[0];
                return parseLib.getWhereIn('Beer','objectId',favBeers.get('favoriteBrews'));
            });
        };
        /**
         * Returns all beers that are on tap in nearby breweries, currently unused
         * @todo limit to local breweries
         */
        this.onTap = function(){
            return parseLib.getAll('Beer');
        };
        /**
         * Returns all beers that are locally brewed
         */
        this.locallyBrewed = function(){
            return parseLib.getAll('Beer');
        };
        /**
         * Returns all beers with the provided style id
         * @param {integer} style_id
         */
        this.withStyle = function(style_id){
            return parseLib.getWhere('Beer',{styleId:style_id});
        };
    }]);
