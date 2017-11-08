'use strict';

/**
 * @ngdoc service
 * @name core.Services.Specials
 * @description Specials Service
 */
angular
    .module('core')
    .service('Specials', [
        'Parse',
        function(parse) {
            this.getForBrewery = function(brewery_id){
                return parse.getWhere('Specials',{'establishments':brewery_id});
            };
            
            this.getAll = function(){
	
            	var query = new Parse.Query('Specials');
                
                query.descending('createdAt');
            	
            	return query.find();
            };
        }
    ]);
