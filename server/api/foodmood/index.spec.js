'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var foodmoodCtrlStub = {
  index: 'foodmoodCtrl.index',
  show: 'foodmoodCtrl.show',
  create: 'foodmoodCtrl.create',
  update: 'foodmoodCtrl.update',
  destroy: 'foodmoodCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var foodmoodIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './foodmood.controller': foodmoodCtrlStub
});

describe('Foodmood API Router:', function() {

  it('should return an express router instance', function() {
    foodmoodIndex.should.equal(routerStub);
  });

  describe('GET /api/foodmood', function() {

    it('should route to foodmood.controller.index', function() {
      routerStub.get
        .withArgs('/', 'foodmoodCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/foodmood/:id', function() {

    it('should route to foodmood.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'foodmoodCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/foodmood', function() {

    it('should route to foodmood.controller.create', function() {
      routerStub.post
        .withArgs('/', 'foodmoodCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/foodmood/:id', function() {

    it('should route to foodmood.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'foodmoodCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/foodmood/:id', function() {

    it('should route to foodmood.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'foodmoodCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/foodmood/:id', function() {

    it('should route to foodmood.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'foodmoodCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
