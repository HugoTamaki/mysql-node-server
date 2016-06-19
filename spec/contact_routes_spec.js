describe('ContactRoutes', function () {
  var chai     = require('chai'),
      chaiHttp = require('chai-http'),
      expect   = chai.expect
  var Contact  = require('../models/contact')
  var server   = require('../server')
  var sinon    = require('sinon')
  var Q        = require('Q')
  var config   = require('../config')

  chai.use(chaiHttp)

  var mysql = require('mysql')
  var connection = mysql.createConnection(config.db)

  afterEach(function (done) {
    connection.query('TRUNCATE TABLE contacts', function (err, result) {
      done()
    })
  })

  describe('#get contacts', function () {
    beforeEach(function (done) {
      connection.query('INSERT INTO contacts (name, phone, carrier_id) VALUES ("teste", "9999999", 1)', function (err, result) {
        done()
      })
    })

    it('should return contacts', function (done) {
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
    it('should create contact', function (done) {
      chai.request('http://localhost:8000/api')
        .post('/contacts')
        .send({contact: {name: 'teste', phone: '9999999', carrier_id: 1}})
        .end(function (err, res) {
          expect(res.status).to.equal(200)
          expect(res.body).to.deep.equal({contact: {id: 1, name: 'teste', phone: '9999999', carrier_id: 1}})
          done()
        })
    })
  })

  describe('#get contacts/:id', function () {
    beforeEach(function (done) {
      connection.query('INSERT INTO contacts (name, phone, carrier_id) VALUES ("John", "99999999", 1)', function (err, result) {
        done()
      })
    })

    it('should get one contact by id', function (done) {
      chai.request('http://localhost:8000/api')
        .get('/contacts/1')
        .end(function (err, res) {
          expect(res.status).to.equal(200)
          expect(res.body).to.deep.equal({contact: {id: 1, name: 'John', phone: '99999999', carrier_id: 1}})
          done()
        })
    })
  })

  describe('#put contacts/:id', function () {
    beforeEach(function (done) {
      connection.query('INSERT INTO contacts (name, phone, carrier_id) VALUES ("John", "99999999", 1)', function (err, result) {
        done()
      })
    })

    it('should update one contact by id', function (done) {
      chai.request('http://localhost:8000/api')
        .put('/contacts/1')
        .send({contact: {name: 'teste', phone: '9999999', carrier_id: 1}})
        .end(function (err, res) {
          expect(res.status).to.equal(200)
          expect(res.body).to.deep.equal({contact: {id: 1, name: 'teste', phone: '9999999', carrier_id: 1}})
          done()
        })
    })
  })
})