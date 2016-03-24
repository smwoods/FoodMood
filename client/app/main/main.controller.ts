'use strict';

(function() {

class MainController {

  constructor($http) {
    this.$http = $http;
    this.restaurants = [];
  }

  $onInit() {
    this.$http.get('/api/things/restaurant').then(response => {
      this.restaurants = response.data.businesses;
    });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('foodmoodApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
