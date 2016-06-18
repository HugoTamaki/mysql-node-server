describe('ContactRoutes', function () {
  var chai     = require('chai'),
      chaiHttp = require('chai-http'),
      expect   = chai.expect
  var Contact  = require('../models/contact')
  var server   = require('../server')
  var sinon    = require('sinon')
  var Q        = require('Q')
  chai.use(chaiHttp)

  describe('#get contacts', function () {
    it('should return contacts', function (done) {
      var deferred = Q.defer(),
          promise = deferred.promise

      deferred.resolve({contacts: [{id: 1, name: 'teste', phone: '9999999', carrier_id: 1}]})
      sinon.stub(Contact, 'index').returns(promise)

      chai.request('http://localhost:8000/api')
        .get('/contacts')
        .end(function (err, res) {
          expect(res.status).to.equal(200)
          expect(res.body).to.deep.equal({contacts: [{id: 1, name: 'teste', phone: '9999999', carrier_id: 1}]})
          done()
        })
    })
  })

  describe('#post contacts', function () {
    it('should create contact', function () {
      var deferred = Q.defer(),
          promise = deferred.promise

      deferred.resolve({contact: {id: 1, name: 'teste', phone: '9999999', carrier_id: 1}})
      sinon.stub(Contact, 'create').returns(promise)

      chai.request('http://localhost:8000/api')
        .post('/contacts')
        .send({contact: {name: 'teste', phone: '9999999', carrier_id: 1}})
        .end(function (err, res) {
          expect(res.status).to.equal(200)
          expect(res.body).to.deep.equal({contact: {id: 1, name: 'teste', phone: '9999999', carrier_id: 1}})
        })
    })
  })

  describe('#get contacts/:id', function () {
    it('should get one contact by id', function () {
      var deferred = Q.defer(),
          promise = deferred.promise

      deferred.resolve({contact: {id: 1, name: 'teste', phone: '9999999', carrier_id: 1}})
      sinon.stub(Contact, 'getOne').returns(promise)

      chai.request('http://localhost:8000/api')
        .get('/contacts/1')
        .end(function (err, res) {
          expect(res.status).to.equal(200)
          expect(res.body).to.deep.equal({contact: {id: 1, name: 'teste', phone: '9999999', carrier_id: 1}})
        })
    })
  })
})