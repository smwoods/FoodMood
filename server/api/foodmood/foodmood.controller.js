/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/foodmood              ->  index
 * POST    /api/foodmood              ->  create
 * GET     /api/foodmood/:id          ->  show
 * PUT     /api/foodmood/:id          ->  update
 * DELETE  /api/foodmood/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Foodmood from './foodmood.model';

var yelpService = require('../../services/yelp.service');

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

// Gets a list of Foodmoods
export function index(req, res) {
  return Foodmood.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Foodmood from the DB
export function show(req, res) {
  return Foodmood.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Foodmood in the DB
export function create(req, res) {
  var params = {
    terms: req.body.tags,
    location: req.body.location
  }
  yelpService.search(params)
  .then(function(data) {
    var playlist = data.businesses.map(function(rest) {return rest.id;});
    req.body.playlist = playlist;
    req.body.ind = 0;
    return Foodmood.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
  })
  
}

 export function getRestaurantDetails(req, res){
  var yelpid = req.params.yelpid;
  console.log(req.params);
   yelpService.getRestaurantByYelpID(yelpid)
   .then(function(data) {
    return res.status(200).json(data);    // send back to front end
  })

 }

// Updates an existing Foodmood in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Foodmood.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Foodmood from the DB
export function destroy(req, res) {
  return Foodmood.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
