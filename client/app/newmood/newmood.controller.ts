'use strict';

(function() {

class NewMoodController {


  constructor($http, $state) {
    this.$http = $http;
    this.$state = $state;
    this.mood = null;
  }

  $onInit() {
  }

  createFoodmood() {
    console.log('fired');
    return this.$http.post('/api/foodmood', this.mood)
    .then(response => {
      console.log(response.data);
      this.$state.go('main');
    });
  }

}




angular.module('foodmoodApp')
  .controller('NewMoodController', NewMoodController);

})();
