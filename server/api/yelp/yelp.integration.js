'use strict';

var app = require('../..');
import request from 'supertest';

var newYelp;

describe('Yelp API:', function() {

  describe('GET /api/yelp', function() {
    var yelps;

    beforeEach(function(done) {
      request(app)
        .get('/api/yelp')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          yelps = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      yelps.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/yelp', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/yelp')
        .send({
          name: 'New Yelp',
          info: 'This is the brand new yelp!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newYelp = res.body;
          done();
        });
    });

    it('should respond with the newly created yelp', function() {
      newYelp.name.should.equal('New Yelp');
      newYelp.info.should.equal('This is the brand new yelp!!!');
    });

  });

  describe('GET /api/yelp/:id', function() {
    var yelp;

    beforeEach(function(done) {
      request(app)
        .get('/api/yelp/' + newYelp._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          yelp = res.body;
          done();
        });
    });

    afterEach(function() {
      yelp = {};
    });

    it('should respond with the requested yelp', function() {
      yelp.name.should.equal('New Yelp');
      yelp.info.should.equal('This is the brand new yelp!!!');
    });

  });

  describe('PUT /api/yelp/:id', function() {
    var updatedYelp;

    beforeEach(function(done) {
      request(app)
        .put('/api/yelp/' + newYelp._id)
        .send({
          name: 'Updated Yelp',
          info: 'This is the updated yelp!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedYelp = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedYelp = {};
    });

    it('should respond with the updated yelp', function() {
      updatedYelp.name.should.equal('Updated Yelp');
      updatedYelp.info.should.equal('This is the updated yelp!!!');
    });

  });

  describe('DELETE /api/yelp/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/yelp/' + newYelp._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when yelp does not exist', function(done) {
      request(app)
        .delete('/api/yelp/' + newYelp._id)
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
