'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var yelpCtrlStub = {
  index: 'yelpCtrl.index',
  show: 'yelpCtrl.show',
  create: 'yelpCtrl.create',
  update: 'yelpCtrl.update',
  destroy: 'yelpCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var yelpIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './yelp.controller': yelpCtrlStub
});

describe('Yelp API Router:', function() {

  it('should return an express router instance', function() {
    yelpIndex.should.equal(routerStub);
  });

  describe('GET /api/yelp', function() {

    it('should route to yelp.controller.index', function() {
      routerStub.get
        .withArgs('/', 'yelpCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/yelp/:id', function() {

    it('should route to yelp.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'yelpCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/yelp', function() {

    it('should route to yelp.controller.create', function() {
      routerStub.post
        .withArgs('/', 'yelpCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/yelp/:id', function() {

    it('should route to yelp.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'yelpCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/yelp/:id', function() {

    it('should route to yelp.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'yelpCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/yelp/:id', function() {

    it('should route to yelp.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'yelpCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
