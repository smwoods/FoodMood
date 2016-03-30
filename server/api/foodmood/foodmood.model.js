'use strict';

import mongoose from 'mongoose';

var FoodmoodSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  tags: [String]
});

export default mongoose.model('Foodmood', FoodmoodSchema);
