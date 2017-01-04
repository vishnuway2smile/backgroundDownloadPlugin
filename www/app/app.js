"use strict";

angular.module("ngapp", [ "ui.router", "ngMaterial", "ngCordova", "ngStorage" ])
// ngTouch is No Longer Supported by Angular-Material

.run(function($rootScope, $cordovaDevice, $cordovaStatusbar){
 


  document.addEventListener("deviceready", function () {



    $cordovaStatusbar.overlaysWebView(false); // Always Show Status Bar


    $cordovaStatusbar.styleHex('#E53935'); // Status Bar With Red Color, Using Angular-Material Style
    


    window.plugins.orientationLock.lock("portrait");

    
  }, false);



})


.config(function($mdThemingProvider, $mdGestureProvider) { // Angular-Material Color Theming
  $mdGestureProvider.skipClickHijack();

  $mdThemingProvider.theme('default')
    .primaryPalette('red')
    .accentPalette('blue');
});
