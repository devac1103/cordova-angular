/// <reference path="../../../../typings/jquery/jquery.d.ts"/>
'use strict';

/**
 * @ngdoc service
 * @name core.Services.Location
 * @description Location Service returns a promise that can be used to get the
 * current latitude and longitude of the device using the geolocation plugin
 */
angular
    .module('core')
    .service('LocationService', [

        function() {

            this.getPosition = function(){
                var deferred = $.Deferred();
                
                var options = {
                    enableHighAccuracy: false,
                    timeout: 10000,
                    maximumAge: 60000
                };
                
                navigator.geolocation.getCurrentPosition(deferred.resolve,deferred.reject,options);
                
                return deferred.promise();
            };

        }
    ]);
