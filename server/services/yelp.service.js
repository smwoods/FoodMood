'use strict';

import _ from 'lodash';

var YelpHelper = require('yelp');

var yelp = new YelpHelper({
  consumer_key: 'te2R-GbQUaayysqlFq1Mnw',
  consumer_secret: '9nKFi3_Hb_oQAzXtYfQWRvEegUg',
  token: 'MQCvpMHTl3hwxpEmkrLCJJzeIjdHvuhu',
  token_secret: '53NEcA7fc9r6YhFfIhzRGfMojAA',
});

export function searchYelp(req, res) {
  console.log("request goin out");
  yelp.search({ term: req.params.searchTerm, location: req.params.searchPlace })
  .then(function (data) {
    console.log("yelp responded");
    res.status(200).json(data.businesses);
  })
  .catch(function (err) {
    console.error(err);
  });
}