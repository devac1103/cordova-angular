/* global moment */
/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
'use strict';

/**
 * @ngdoc service
 * @name core.Services.HoursOfOperationService
 * @description HoursOfOperationService Service determines what is displayed based on the provided object
 * for hours in the client table in parse. getHoursMessage is the only public function this service
 * exposes.
 */
angular
    .module('core')
    .service('HoursOfOperationService', [function(){
        this.getHoursMessage = function(brewery){

            var hourData = getHours(brewery);
            var kitchenHourData = getKitchenHours(brewery);

            return {
                'storeHours':storeHoursMessage(hourData),
                'kitchenHours':kitchenHoursMessage(kitchenHourData)
            };
        };

        var now = moment();

        var getHours = function(brewery){
            return opHours(brewery.get('hoursObject'));
        };

        var getKitchenHours = function(brewery){
            return opHours(brewery.get('kitchenCloseTime'));
        };

        var storeHoursMessage = function(storeHours){
            var today = getOpenClose(storeHours.today);
            var tomorrow = getOpenClose(storeHours.tomorrow);
            
            if( today.close == 'closed' ){
                return {
                    message: 'Closed',
                    closedStatus: 'closed'
                };
            }

            if( today.close == 'closed' && tomorrow.close == 'closed' ){
                return {
                    'message' : 'Closed today and tomorrow',
                    'closedStatus' : 'closed'
                };
            }

            if( moment(now).isBefore(moment(today.open,'h:mm A')) ){
                return {
                    'message' : 'Closed',
                    'closedStatus' : 'closed'
                };
            }

            return {
                    'message' : 'Last Call ' + today.close,
                    'closedStatus' : 'open'
                };
        };

        var kitchenHoursMessage = function(kitchenHours){
            var today = getOpenClose(' - ' + kitchenHours.today);

            if( today.close == 'closed' ){
                return {
                    'message' : 'Kitchen closed',
                    'closedStatus' : 'closed'
                };
            }

            return {
                    'message' : 'Kitchen closes at ' + today.close,
                    'closedStatus' : 'open'
                };
        };

        var getOpenClose = function(hours){
            if( hours == 'closed' ){
                return {
                    'open':'closed',
                    'close':'closed'
                };
            }
            //check format

            var hours_arr = hours.split(' - ');

            return {
                'open' : hours_arr[0],
                'close' : hours_arr[1]
            };
        };

        var opHours = function(hourObject){

            var intDay = now.hour() < 4 ? now.day() - 1 : now.day();

            var today = moment.weekdays(intDay).toLowerCase();
            var tommorrow = moment.weekdays(intDay+1).toLowerCase();

            return {
                'today':hourObject[today],
                'tomorrow':hourObject[tommorrow]
            };
        };
    }]);
