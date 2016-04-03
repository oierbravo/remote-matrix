'use strict';
var config = {
  server: 'http://entzun.jazar.org:3030'
}
/**
 * @ngdoc overview
 * @name remoteMatrixApp
 * @description
 * # remoteMatrixApp
 *
 * Main module of the application.
 */
angular
  .module('remoteMatrixApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngFeathers'
  ])
  .config(function ($routeProvider,FeathersProvider) {
     FeathersProvider.defaults.server = config.server

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/matrix', {
        templateUrl: 'views/matrix-grid.html',
        controller: 'MatrixCtrl',
        controllerAs: 'matrix'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
 /* .config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);*/
