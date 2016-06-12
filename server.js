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
    var contact = JSON.parse(req.body.contact)
    Contact.create(contact)
      .then(function (result) {
        res.json('Contact created')
      })
      .then(function (error) {
        res.json(error)
      })
  })

router.route('contacts/:id')
  .get(function (req, res) {
    Contact.getOne(req.params.id)
      .then(function (contact) {
        res.json(contact)
      })
      .catch(function (error) {
        res.json(error)
      })
  })

app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);