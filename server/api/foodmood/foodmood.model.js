'use strict';

import mongoose from 'mongoose';

var FoodmoodSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  tags: [String],
  playlist: [String],
  ind: Number
});

export default mongoose.model('Foodmood', FoodmoodSchema);
