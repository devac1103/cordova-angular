/* global moment */
/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.HomeController
 * @description Home controller
 * @requires ng.$scope
 */
angular
    .module('core')
    .controller('HomeController', ['$scope','HomeMessageService','HomeSectionsService','Specials','LocationService','$location',
	        function ($scope,HomeMessageService,HomeSections,SpecialsService,location,$location) {
                
                $scope.specials = [];
                
                SpecialsService.getAll().then(function(specials){
                    
                    var specialQueue = [];
                    var now          = moment().format();
                    
                    angular.forEach(specials,function(special){
                        
                        var start = moment(special.get('specialStart')).format();
                        var end   = moment(special.get('specialEnd')).format();
                        
                        if( start <= now && end >= now ){
                            specialQueue.push(special);
                        }
                    });
                    
                    $scope.specials = specialQueue;
                    $scope.$apply(); 
                },function(err){
                    console.log(err);
                });
                /**
    	         * Retrieves and sets the home message to the most recent
    	         * message returned from the service
    	         */
    	        HomeMessageService.get().then(function(messages){
    	            var message = messages[messages.length-1];
    	            $scope.message = {
    	                title: message.get('title'),
    	                body: message.get('message')
    	            };
    	            $scope.$apply();
    	        },function(err){
    	            console.log(err);
    	        });  
            
                /**
                 * Retrieves the home sections and sets them
                 * into the scope to be displayed
                 */
                HomeSections.get().then(function(sections){
                    $scope.homeSections = sections[0];
                },function(err){
                    console.log(err);
                });
                
                location.getPosition().then(function(response){
                //Just setting the position here behind the scenes so that
                //if the user goes to a geo sensitive screen within the cache
                //time, it will immediately respond.
                },function(err){
                    console.log(err);
                });          
                
                $scope.go = function(path){
                    $location.path(path);
                };
            }]);