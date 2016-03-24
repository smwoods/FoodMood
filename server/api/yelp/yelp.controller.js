/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/yelp              ->  index
 * POST    /api/yelp              ->  create
 * GET     /api/yelp/:id          ->  show
 * PUT     /api/yelp/:id          ->  update
 * DELETE  /api/yelp/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Yelp from './yelp.model';

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



function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Yelps
export function index(req, res) {
  return Yelp.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}



// Gets a single Yelp from the DB
export function show(req, res) {
  return Yelp.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Yelp in the DB
export function create(req, res) {
  return Yelp.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Yelp in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Yelp.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Yelp from the DB
export function destroy(req, res) {
  return Yelp.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}