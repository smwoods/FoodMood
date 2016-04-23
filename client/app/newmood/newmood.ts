'use strict';

angular.module('foodmoodApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('newmood', {
        url: '/newmood',
        templateUrl: 'app/newmood/newmood.html',
        controller: 'NewMoodController',
        controllerAs: 'ctrl',
      });
  });
