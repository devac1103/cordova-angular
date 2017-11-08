/// <reference path="../../../../typings/angularjs/angular.d.ts"/>
'use strict';

/**
 * @ngdoc service
 * @name core.Services.HomeSectionsService
 * @description HomeSectionsService gets arrays of objects used on the home page, including the icon, title, and link, with support for
 * font awesome, glyphicons, or custom icons where the icon field specifies the file name in app/img/icons
 */
angular
    .module('core')
    .service('HomeSectionsService', [
        '$rootScope',
        '$q',
        'FavoriteBeerService',
        function($rootScope,$q,favorites) {
            
            this.get = function(){
                
                var sections = [];
                
                var topRows = [
                    {
                        icon_type:'custom',
                        icon: 'near-me.svg',
                        title: 'Near Me Now',
                        link: 'near-me'
                    },
                    {
                        icon_type:'custom',
                        icon: 'breweries-icon.svg',
                        title: 'Breweries',
                        link: 'breweries'
                    },
                    {
                        icon_type:'custom',
                        icon: 'pub-grub-icon.svg',
                        title: 'Pubs and Grub',
                        link: 'pubs-n-grub'
                    },
                    {
                        icon_type:'fa',
                        icon:'search',
                        title:'Find Beer',
                        link: 'find-beer'
                    }
                ];
                
                var settingsRows = [
                    {
                        icon_type:'custom',
                        icon: 'info-icon.svg',
                        title: 'Info',
                        link: 'info'
                    }
                ];   
                
                if( $rootScope.isLoggedIn() ){
                    
                    var favPromise = favorites.get($rootScope.currentUser).then(function(response){
                         if( response[0].get('favoriteBrews').length > 0 ){
                             topRows.push(
                                {
                                    icon_type:'custom',
                                    icon: 'favorite-brew-icon.svg',
                                    title: 'My Beers',
                                    link: 'favorites'
                                }
                            );
                         }
                    });
                    
                    settingsRows.push(
                       {
                            icon_type:'custom',
                            icon: 'logout-icon.svg',
                            title: 'Log Out',
                            link: 'log-out',
                            ng_click: 'logOut()'
                        }  
                    );
                } else {
                    settingsRows.push(
                       {
                            icon_type:'custom',
                            icon: 'login-icon.svg',
                            title: 'Log In',
                            link: 'login'
                        }
                    );
                }
               
               sections.push({
                    title: '',
                    rows: topRows
                });
               
               sections.push({
                    title: 'Settings',
                    rows: settingsRows
               });

               var deferred = $q.defer();

               deferred.resolve(sections);
               
               return $q.all([deferred.promise,favPromise]);
            };
        }
    ]);
