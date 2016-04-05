'use strict';

import _ from 'lodash';

var YelpHelper = require('yelp');

var yelp = new YelpHelper({
  consumer_key: 'te2R-GbQUaayysqlFq1Mnw',
  consumer_secret: '9nKFi3_Hb_oQAzXtYfQWRvEegUg',
  token: 'MQCvpMHTl3hwxpEmkrLCJJzeIjdHvuhu',
  token_secret: '53NEcA7fc9r6YhFfIhzRGfMojAA',
});

export function search(params) {
  return yelp.search(params);
}

export function getRestaurantByYelpId(yelpId){
  return yelp.business(yelpId);
}
