var mysql = require('mysql')
var config = require('../config')
var connection = mysql.createConnection(config.db)
var Q = require('q')

var Contact = {
  create: function (options) {
    var sql = 'INSERT INTO contacts (name, phone, carrier_id) VALUES (?, ?, ?)',
        deferred = Q.defer(),
        values = [
          options.name,
          options.phone,
          options.carrier_id,
        ]

    connection.query(sql, values, function (err, result) {
      if (err) {
        deferred.reject(err)
      } else {
        deferred.resolve(
          {
            contact: {
              id: result.insertId,
              name: options.name,
              phone: options.phone,
              carrier_id: options.carrier_id
            }
          })
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
    var sql = 'SELECT * FROM contacts WHERE id = ?',
        deferred = Q.defer(),
        values = [id]

    connection.query(sql, values, function (err, result) {
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
        queryParams = [],
        values

    if (options.name || options.phone || options.carrier_id) {
      sql = prepareQuery(sql, id, options)
      values = prepareValues(options, id)

      connection.query(sql, values, function (err, result) {
        if (err) {
          deferred.reject(err)
        } else {
          options.id = parseInt(id)
          deferred.resolve({contact: options})
        }
      })
    } else {
      deferred.reject('No values passed')
    }

    return deferred.promise
  }
}

function prepareQuery (query, id, options) {
  var queryParams = []

  if (options.name) {
    queryParams.push('name = ?')
  }
  if (options.phone) {
    queryParams.push('phone = ?')
  }
  if (options.carrier_id) {
    queryParams.push('carrier_id = ?')
  }

  query += queryParams.join(',') + ' WHERE id = ?'

  return query
}

function prepareValues (options, id) {
  var values = []

  if (options.name) {
    values.push(options.name)
  }
  if (options.phone) {
    values.push(options.phone)
  }
  if (options.carrier_id) {
    values.push(options.carrier_id)
  }

  values.push(id)

  return values
}

module.exports = Contact