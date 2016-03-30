'use strict';

var app = require('../..');
import request from 'supertest';

var newFoodmood;

describe('Foodmood API:', function() {

  describe('GET /api/foodmood', function() {
    var foodmoods;

    beforeEach(function(done) {
      request(app)
        .get('/api/foodmood')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          foodmoods = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      foodmoods.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/foodmood', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/foodmood')
        .send({
          name: 'New Foodmood',
          info: 'This is the brand new foodmood!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newFoodmood = res.body;
          done();
        });
    });

    it('should respond with the newly created foodmood', function() {
      newFoodmood.name.should.equal('New Foodmood');
      newFoodmood.info.should.equal('This is the brand new foodmood!!!');
    });

  });

  describe('GET /api/foodmood/:id', function() {
    var foodmood;

    beforeEach(function(done) {
      request(app)
        .get('/api/foodmood/' + newFoodmood._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          foodmood = res.body;
          done();
        });
    });

    afterEach(function() {
      foodmood = {};
    });

    it('should respond with the requested foodmood', function() {
      foodmood.name.should.equal('New Foodmood');
      foodmood.info.should.equal('This is the brand new foodmood!!!');
    });

  });

  describe('PUT /api/foodmood/:id', function() {
    var updatedFoodmood;

    beforeEach(function(done) {
      request(app)
        .put('/api/foodmood/' + newFoodmood._id)
        .send({
          name: 'Updated Foodmood',
          info: 'This is the updated foodmood!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFoodmood = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFoodmood = {};
    });

    it('should respond with the updated foodmood', function() {
      updatedFoodmood.name.should.equal('Updated Foodmood');
      updatedFoodmood.info.should.equal('This is the updated foodmood!!!');
    });

  });

  describe('DELETE /api/foodmood/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/foodmood/' + newFoodmood._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when foodmood does not exist', function(done) {
      request(app)
        .delete('/api/foodmood/' + newFoodmood._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
