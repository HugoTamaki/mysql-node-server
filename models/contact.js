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
        deferred.resolve({contact: result})
      }
    })

    return deferred.promise
  },

  index: function () {
    var sql = 'SELECT * FROM contacts',
        deferred = Q.defer()

    connection.query(sql, function (err, result) {
      if (err) {
        deferred.reject(err)
      } else {
        deferred.resolve({contacts: result})
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
        deferred.resolve({contact: result[0]})
      }
    })

    return deferred.promise
  },

  update: function (id, options) {
    var sql = 'UPDATE contacts SET ',
        deferred = Q.defer(),
        values = []

    if (options.name || options.phone || options.carrier_id) {
      options.name ? values.push('name = ' + connection.escape(options.name)) : null
      options.phone ? values.push('phone = ' + connection.escape(options.phone)) : null
      options.carrier_id ? values.push('carrier_id = ' + connection.escape(options.carrier_id)) : null

      sql = sql + values.join(',') + ' WHERE id = ' + connection.escape(id)

      connection.query(sql, function (err, result) {
        if (err) {
          deferred.reject(err)
        } else {
          deferred.resolve({contact: result[0]})
        }
      })
    } else {
      deferred.reject('No values passed')
    }

    return deferred.promise
  }
}

module.exports = Contact