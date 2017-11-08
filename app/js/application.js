'use strict';
/**
 * Initialize Parse with api keys
 */
Parse.initialize("Bjcpkg6UBm0H09rhd4YAEm0q1MyDbqho0J0kpXsH", "nDKpg1Fd98JvSMOMKIMlMWX1oEiYmW3T9MsqZu11");
/**
 * Facebook interaction code
 */
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function(){
	Parse.FacebookUtils.init({
 		appId: '565827826815366',
 		status: false, 
 		cookie: true, 
 		xfbml: true,
 		version: 'v2.3'
 	});
};

angular
    .module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
//Needed for ui-router
angular
    .module(ApplicationConfiguration.applicationModuleName)
    .config(['$locationProvider',
        function($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);

//Then define the init function for starting up the application
angular
    .element(document)
    .ready(function() {
        if (window.location.hash === '#_=_') {
            window.location.hash = '#!';
        }
        //Insert splash page stuff here
        angular
            .bootstrap(document,
                [ApplicationConfiguration.applicationModuleName]);
    });
//Sets up the iOS padding for the header bar
document.addEventListener('deviceready', function () {
    if (window.device && window.device.platform == 'iOS') {
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString('#222222');
    }
});