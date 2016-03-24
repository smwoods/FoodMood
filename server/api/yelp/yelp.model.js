'use strict';

import mongoose from 'mongoose';

var YelpSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Yelp', YelpSchema);
