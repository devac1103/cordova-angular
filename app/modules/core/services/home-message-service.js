'use strict';

/**
 * @ngdoc service
 * @name core.Services.HomeMessageService
 * @description HomeMessageService Service returns a promise that contains the home messages from
 * parse. The controller sorts and takes the most recent one
 * @todo limit this service to gather only the most recent message
 */
angular
    .module('core')
    .service('HomeMessageService', [
        'Parse',
        function(parseLib) {
            /**
             * Returns a promise containing all of the 'HomeMessage' objects
             */
            this.get = function(){
                return parseLib.getAll('HomeMessage');
            };

        }
    ]);
