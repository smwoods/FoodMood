'use strict';

angular.module('foodmoodApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('saved', {
        url: '/saved',
        templateUrl: 'app/saved/saved.html',
        controller: 'SavedController',
        controllerAs: 'ctrl',
      });
  });
