'use strict';

(function() {

class MainController {


  constructor($http) {
    this.$http = $http;
    this.viewMain = true;
    this.moods = [];
    this.currentRestaurant = null;
    this.currentMood = null;
  }

  $onInit() {
    this.$http.get('/api/foodmood').then(response => {
      this.moods = response.data;
      console.log(this.moods[0]);
    });
  }

  switchViews() {
    this.viewMain = !this.viewMain;
  }

  setFoodmood(mood) {
    for (var i=0; i < this.moods.length; i++) {
      if (this.moods[i]._id == mood._id) {
        this.currentMood = this.moods[i];
      }
    }
  }

  createFoodmood() {
    return this.$http.post('/api/foodmood', this.mood)
    .then(response => {
      console.log(response.data);
      this.moods.push(response.data);
      this.currentMood = this.moods[this.moods.length - 1];
      this.getRestaurant();
      this.switchViews();     
    });
  }

  getRestaurant() {
    var yelpid = this.currentMood.playlist[this.currentMood.ind]
   return this.$http.get('/api/foodmood/yelpid/'+yelpid)
    .then(response => {
      console.log(response.data);   
      this.currentRestaurant = response.data;
    });
  }

}




angular.module('foodmoodApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
