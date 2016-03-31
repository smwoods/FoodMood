'use strict';

(function() {

class MainController {


  constructor($http) {
    this.$http = $http;
    this.searchTerm = 'pizza';
    this.searchPlace = 'Boston';
    this.restaurants = [];
    this.viewMain = true;
    this.tagList = ['American', 'Italian', 'cheap'];
  }

  $onInit() {
    // this.$http.get('/api/yelp/restaurant').then(response => {
    //   this.restaurants = response.data.businesses;
    // });
  }

  switchViews() {
    console.log("in here");
    this.viewMain = !this.viewMain;
  }

  // search() {
  //   var url = '/api/yelp/search/' + this.searchTerm + '/' + this.searchPlace;
  //   this.$http.get(url).then(response => {
  //     this.restaurants = response.data;
  //   });
  // }
}



angular.module('foodmoodApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
