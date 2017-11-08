'use strict';

/**
 * @ngdoc service
 * @name core.Services.LoginFlag
 * @description LoginFlag Service returns messages from parse based on the content of a flag variable
 * in the login controller. See the LoginMessages table in parse for flag / message combinations
 */
angular
    .module('core')
    .service('LoginFlag', [
        'Parse',
        function(parseLib){
            /**
             * Returns the message for the provided flag
             * @param {string} flag - Flag to search for to retrieve message
             */
            this.getMessage = function(flag){
                return parseLib.getWhere('LoginMessages',{'flag':flag});  
            };
        }
    ]);
