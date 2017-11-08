'use strict';

/**
 * @ngdoc service
 * @name core.Services.FavoriteBeerService
 * @description FavoriteBeerService Service handles interactions with users and their favorite beers
 */
angular
    .module('core')
    .service('FavoriteBeerService', [
        'Parse',
        function(parseLib) {
        	/**
             * Returns beers for the provided user
             * @param user - User for which to get favorite beers
             */
        	this.get = function(user){
        		return parseLib.getWhere('Favorites',{'user':user});
        	};
        	/**
             * Saves an array of favorites and associates them with the current user
             * @param favorites - Favorites object to save for the current user
             */
        	this.save = function(favorites){
                console.log(favorites);
        		return parseLib.save(favorites);
        	};
            /**
             * Generates a new favorite beers object for the provided user. Used if the 
             * get function doesn't return anything
             * @param user - User for which to create a new Favorites object
             */
            this.new = function(user){
                var favorites = parseLib.new('Favorites');
                favorites.set('user',user);
                favorites.set('favoriteBrews',[]);
                return this.save(favorites);
            };
        }
    ]);
