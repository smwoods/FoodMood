'use strict';

(function() {

class MainController {


  constructor($http) {
    this.$http = $http;
    this.searchTerm = 'pizza';
    this.searchPlace = 'Boston';
    this.restaurants = [];

  }

  $onInit() {
    // this.$http.get('/api/yelp/restaurant').then(response => {
    //   this.restaurants = response.data.businesses;
    // });
  }

  search() {
    var url = '/api/yelp/search/' + this.searchTerm + '/' + this.searchPlace;
    this.$http.get(url).then(response => {
      this.restaurants = response.data;
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
