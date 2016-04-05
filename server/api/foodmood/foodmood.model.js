'use strict';

import mongoose from 'mongoose';

var FoodmoodSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  tags: [String],
  playlist: [String]
});

export default mongoose.model('Foodmood', FoodmoodSchema);
