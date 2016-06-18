describe('ContactRoutes', function () {
  var chai = require('chai'),
      chaiHttp = require('chai-http'),
      expect = chai.expect
  chai.use(chaiHttp)
  var Contact = require('../models/contact')

  describe('#get contacts', function () {
    it('should return contacts', function (done) {

      chai.request('http://localhost:8000/api')
        .get('/contacts')
        .then(function (err, res) {
          expect(res.status).toEqual(200)
          done()
        })
    })
  })
})