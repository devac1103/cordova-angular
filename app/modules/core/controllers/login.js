'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.LoginController
 * @description LoginController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('LoginController', [
        '$scope',
        '$rootScope',
        '$stateParams',
        'Parse',
        'LoginFlag',
        function($scope,$rootScope,$params,Parse,LoginFlag) {
            /**
             * Return the user to the previous page if they land
             * here on accident
             */
            if( $rootScope.isLoggedIn() ){
        		window.history.back();
        	}
            
            /**
             * Messages to display on the login page {type:'',message:''}
             */
        	$scope.messages = [];
            
            /**
             * Start out showing the sign in form, signup will show the sign up
             * form first
             */
            $scope.loginForm = 'regular';
            
        	if( $params.messageType ){
                
        		var messageFlag = $params.messageType.replace('/','');
                
                LoginFlag.getMessage(messageFlag).then(function(response){
                    var loginMessage = response[0];
                    $scope.messages.push({
                        'type':loginMessage.get('type'),
                        'message':loginMessage.get('message')
                    });
                    $scope.$apply();
                },function(err){
                    console.log(err);
                });
        	}
            
        }
]);
