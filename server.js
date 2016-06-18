var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()

app.use(bodyParser.urlencoded({extend: true}))
app.use(bodyParser.json())
app.use(cors())

var port = process.env.port || 8000

var router = express.Router()

router.get('/', function(req, res) {
  res.json({message: 'hooray! welcome to our api!'})
})

var Contact = require('./models/contact')

router.route('/contacts')
  .get(function (req, res) {
    Contact.index()
      .then(function (result) {
        res.json(result)
      })
      .catch(function (error) {
        res.json(error)
      })
  })

  .post(function (req, res) {
    var contact = req.body.contact
    Contact.create(contact)
      .then(function (result) {
        res.json(result)
      })
      .then(function (error) {
        res.json(error)
      })
  })

router.route('/contacts/:contact_id')
  .get(function (req, res) {
    Contact.getOne(req.params.contact_id)
      .then(function (contact) {
        res.json(contact)
      })
      .catch(function (error) {
        res.json(error)
      })
  })

  .put(function (req, res) {
    var contact = req.body.contact,
        contact_id = req.params.contact_id

    Contact.update(contact_id, contact)
      .then(function (result) {
        res.json(result)
      })
      .catch(function (error) {
        res.json(error)
      })
  })

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port)
