'use strict';

import mongoose from 'mongoose';

var FoodmoodSchema = new mongoose.Schema({
// title and description of the foodmood
  title: String,
  description: String,
// where restaurant results will be located
  location: String,
// tags used to search the Yelp API
  tags: [String],
// a list of ids that will return retaurauntns from the Yelp API
  playlist: [String],
// and index that maintains the location in the list the user is currently at
  ind: Number
});

