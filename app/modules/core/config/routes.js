/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
/* global $ */
'use strict';

/**
 * @ngdoc object
 * @name core.config
 * @requires ng.$stateProvider
 * @requires ng.$urlRouterProvider
 * @description Defines the routes and other config within the core module
 */
angular
    .module('core')
    .config(['$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            
            if (window.device && window.device.platform == 'iOS') {
                $('.navbar').css('margin-top','20px');
                $('#content-section').css('margin-top','20px');
                // OR do whatever layout you need here, to expand a navigation bar etc
            }
            
            $urlRouterProvider.otherwise('/');
            
            
            $stateProvider
            /**
             * @ngdoc event
             * @name core.config.route
             * @eventOf core.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the state is `'find-beer'`, route to find-beer
             *
            */
            .state('find-beer', {
                url: '/find-beer',
                templateUrl: 'modules/core/views/find-beer.html',
                controller: 'FindBeerController',
                data: {
                    requireLogin: false
                }
            })
            /**
             * @ngdoc event
             * @name core.config.route
             * @eventOf core.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the state is `'comment'`, route to comment
             *
            */
            .state('comment', {
                url: '/comment',
                templateUrl: 'modules/core/views/comment.html',
                controller: 'CommentController',
                data: {
                    requireLogin: false
                }
            }).
            /**
             * @ngdoc event
             * @name core.config.route
             * @eventOf core.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the state is `'beer-style'`, route to beer-style
             *
            */
            state('beer-style', {
                url: '/beer-style{style_id:(?:/[^/]+)?}',
                templateUrl: 'modules/core/views/beer-style.html',
                controller: 'BeerStyleController',
                data: {
                    requireLogin: false
                }
            }).
            /**
             * @ngdoc event
             * @name core.config.route
             * @eventOf core.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the state is `'view-beer'`, route to beer
             *
            */
            state('view-beer', {
                url: '/beer{beer_id:(?:/[^/]+)?}',
                templateUrl: 'modules/core/views/view-beer.html',
                controller: 'ViewBeerController',
                data: {
                    requireLogin: false
                }
            }).
            /**
             * @ngdoc event
             * @name core.config.route
             * @eventOf core.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the state is `'view-brewery'`, route to brewery
             *
            */
            state('view-brewery', {
                    url: '/brewery{brewery_id:(?:/[^/]+)?}',
                    templateUrl: 'modules/core/views/view-brewery.html',
                    controller: 'ViewBreweryController',
                data: {
                    requireLogin: false
                }
            }).
            /**
             * @ngdoc event
             * @name core.config.route
             * @eventOf core.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the state is `'login'`, route to login
             *
             */
            state('login', {
                url: '/login{messageType:(?:/[^/]+)?}',
                templateUrl: 'modules/core/views/login.html',
                controller: 'LoginController',
                data: {
                    requireLogin: false
                }
            }).
            /**
             * @ngdoc event
             * @name core.config.route
             * @eventOf core.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the state is `'info'`, route to info
             *
             */
            state('info', {
                url: '/info',
                templateUrl: 'modules/core/views/info.html',
                controller: 'InfoController',
                data: {
                    requireLogin: false
                }
            }).
            /**
             * @ngdoc event
             * @name core.config.route
             * @eventOf core.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the state is `'favorites'`, route to favorites
             *
             */
            state('favorites', {
                url: '/favorites',
                templateUrl: 'modules/core/views/beer-list.html',
                controller: 'BeerController',
                data: {
                    requireLogin: false
                }
            })
            /**
             * @ngdoc event
             * @name core.config.route
             * @eventOf core.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the state is `'on-tap'`, route to on-tap
             *
             */
            .state('on-tap', {
                url: '/on-tap',
                templateUrl: 'modules/core/views/beer-list.html',
                controller: 'BeerController',
                data: {
                    requireLogin: false
                }
            })
            /**
             * @ngdoc event
             * @name core.config.route
             * @eventOf core.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the state is `'locally-brewed'`, route to locally-brewed
             *
             */
            .state('locally-brewed', {
                url: '/locally-brewed',
                templateUrl: 'modules/core/views/beer-list.html',
                controller: 'BeerController',
                data: {
                    requireLogin: false
                }
            })
            /**
             * @ngdoc event
             * @name core.config.route
             * @eventOf core.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the state is `'pubs-n-grub'`, route to pubs-n-grub
             *
             */
            .state('pubs-n-grub', {
                url: '/pubs-n-grub',
                templateUrl: 'modules/core/views/brewery-list.html',
                controller: 'BreweriesController',
                data: {
                    requireLogin: false
                }
            })
            /**
             * @ngdoc event
             * @name core.config.route
             * @eventOf core.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the state is `'breweries'`, route to breweries
             *
             */
            .state('breweries', {
                url: '/breweries',
                templateUrl: 'modules/core/views/brewery-list.html',
                controller: 'BreweriesController',
                data: {
                    requireLogin: false
                }
            })
            /**
             * @ngdoc event
             * @name core.config.route
             * @eventOf core.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the state is `'near-me'`, route to near-me
             *
             */
            .state('near-me', {
                url: '/near-me',
                templateUrl: 'modules/core/views/brewery-list.html',
                controller: 'BreweriesController',
                data: {
                    requireLogin: false
                }
            })
            /**
             * @ngdoc event
             * @name core.config.route
             * @eventOf core.config
             * @description
             *
             * Define routes and the associated paths
             *
             * - When the path is `'/'`, route to home
             * */
            .state('home', {
                url: '/',
                templateUrl: 'modules/core/views/home.html',
                controller: 'HomeController',
                data: {
                    requireLogin: false
                }
            });
        }
    ]);
