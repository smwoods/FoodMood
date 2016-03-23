'use strict';

angular.module('foodmoodApp', [
  'foodmoodApp.auth',
  'foodmoodApp.admin',
  'foodmoodApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
