'use strict';

angular.module('foodmoodApp.auth', [
  'foodmoodApp.constants',
  'foodmoodApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
