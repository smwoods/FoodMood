'use strict';

(function() {

class MainController {


  constructor($http, $state) {
    this.$http = $http;
    this.$state = $state;
    this.viewMain = true;
    this.moods = [];
    this.currentRestaurant = null;
    this.currentMood = null;
    this.dropExpanded = false;
  }

  $onInit() {
    this.$http.get('/api/foodmood').then(response => {
      this.moods = response.data;
      this.setFoodmood(this.moods[this.moods.length-1]);
    });
  }

  switchViews() {
    this.viewMain = !this.viewMain;
  }

  setFoodmood(mood) {
    for (var i=0; i < this.moods.length; i++) {
      if (this.moods[i]._id == mood._id) {
        if (this.currentMood == this.moods[i]) {
          return;
        }
        this.currentMood = this.moods[i];
        this.getNextRestaurant();
        if (this.dropExpanded) {
          this.dropExpanded = false;
        }
      }
    }
  }

  createFoodmood() {
    this.$state.go('newmood');
  }

  getNextRestaurant() {
    var moodId = this.currentMood._id;
    return this.$http.get('/api/foodmood/'+moodId+'/next')
    .then(response => {
      this.currentRestaurant = response.data;
      this.currentRestaurant.image = this.getOriginalImageUrl(this.currentRestaurant.image_url);
      console.log(this.currentRestaurant);
    });
  }

  saveRestaurant() {
     console.log("here");
  }

  getOriginalImageUrl(url) {
    var shortened = url.substring(0, url.lastIndexOf("/") + 1);
    console.log(url, shortened);
    return shortened + 'o.jpg'
  }

  toggleDropdown() {
    console.log("Dropdown expanding");
    this.dropExpanded = !this.dropExpanded;
  }

}




angular.module('foodmoodApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
