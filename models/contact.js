var mysql = require('mysql')
var config = require('../config')
var connection = mysql.createConnection(config.db)
var Q = require('q')

var Contact = {
  create: function (options) {
    var sql = 'INSERT INTO contacts (name, phone, carrier_id) VALUES (',
        deferred = Q.defer()

    sql += connection.escape(options.name) + ','
    sql += connection.escape(options.phone) + ','
    sql += connection.escape(options.carrier_id) + ')'

    connection.query(sql, function (err, result) {
      if (err) {
        deferred.reject(err)
      } else {
        deferred.resolve(result[0])
      }
    })

    return deferred.promise
  },

  index: function () {
    var sql = 'SELECT * FROM contacts',
        deferred = Q.defer()

    connection.query(sql, function (err, result) {
      if (err) {

      } else {
        deferred.resolve(result[0])
      }
    })

    return deferred.promise
  },

  getOne: function (id) {
    var sql = 'SELECT * FROM contacts WHERE id = ' + connection.escape(id),
        deferred = Q.defer()

    connection.query(sql, function (err, result) {
      if (err) {
        deferred.reject(err)
      } else {
        deferred.resolve(result[0])
      }
    })

    return deferred.promise
  }
}

module.exports = Contact