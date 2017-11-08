/// <reference path="../../../typings/angularjs/angular.d.ts"/>
/* global ApplicationConfiguration */
'use strict';
/**
 * @ngdoc overview
 * @name core
 * @description The angular services, filters, directives, filters within the core module are accessible throughout the angular app like any other provider within the app, but these providers do not necessarily belong to any particular module, hence their placement would be here.
 */
ApplicationConfiguration.registerModule('core');

angular.module('core', [])
    .run(['$rootScope', '$state', '$location', 'Parse', function ($scope, $state, $location, parse) {
        var Parse = parse.getParse();

        $scope.currentUser = Parse.User.current();

        $scope.isHome = function () {
            return $location.path() == '/';
        };

        $scope.logIn = function (form) {
            Parse.User.logIn(form.username, form.password).then(
                function (user) {
                    $scope.currentUser = user;
                    $scope.$apply();
                    $state.go('home');
                },
                function (err) {
                    alert('Unable to sign in: ' + err.code + ' ' + err.message);
                });
        };

        $scope.signUp = function (form) {

            if (form.password !== form.password_confirm) {
                return false;
            }

            var user = new Parse.User();
            user.set("email", form.email);
            user.set("username", form.username);
            user.set("password", form.password);

            user.signUp(null, {
                success: function (user) {
                    $scope.currentUser = user;
                    $scope.$apply(); // Notify AngularJS to sync currentUser
                    $state.go('home');
                },
                error: function (user, error) {
                    alert("Unable to sign up:  " + error.code + " " + error.message);
                }
            });
        };

        $scope.loginWithFacebook = function () {
        	
        	facebookConnectPlugin.login(['public_profile'],
        			function(userData){
        				Parse.FacebookUtils.logIn({
        					'expiration_date':moment().add(5167951,'seconds').format(),
        					'id':userData.authResponse.userID,
        					'access_token':userData.authResponse.accessToken
        				}).then(
    						function(response){
    	        				$scope.currentUser = Parse.User.current();
    	        				$scope.$apply(); // Notify AngularJS to sync currentUser
    	                        $state.go('home');
    	        			},
    	        			function(err){
    	        				alert("We're sorry, but we couldn't log you in, please try again.");
    	        				console.log(err);
    	        			}
        				);
        			},
        			function(err){
        				console.log(err);
        			});
        };

        $scope.logOut = function () {
        	facebookConnectPlugin.logout(
        		function(response){
        			console.log(response);
        		},
        		function(err){
        			console.log(err);
        		}
        	);
            Parse.User.logOut();
            $scope.currentUser = null;
            $scope.$apply();
            $state.go('login');
        };

        $scope.isLoggedIn = function () {
            return typeof $scope.currentUser !== 'undefined' && $scope.currentUser !== null;
        };
}]);

angular.module('core').run(['$rootScope', '$state', function ($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        var requireLogin = toState.data.requireLogin;

        if (!$rootScope.isLoggedIn() && requireLogin) {
            event.preventDefault();
            $state.go('login');
        }
    });
}]);