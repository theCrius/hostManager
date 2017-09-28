"use strict";
const migrate = require('widget-knex-schema');
const addressesSchema = require('../schemas/addresses');

exports.up = function(knex, Promise) {
  return migrate.createTable(knex, 'addresses', addressesSchema, true)
  .then(function () {
    const addresses_pool = [
      {"id":1, "property_id": 1, "line1": "Flat 5", "line4": "7 Westbourne Terrace", "postCode": "W2 3UL", "city": "London", "country": "U.K."},
      {"id":2, "property_id": 2, "line1": "4", "line2": "Tower Mansions", "line3": "Off Station road", "line4": "86-87 Grange Road", "postCode": "SE1 3BW", "city": "London", "country": "U.K."},
      {"id":3, "property_id": 3, "line1": "4", "line2": "332b", "line4": "Goswell Road", "postCode": "EC1V 7LQ", "city": "London", "country": "U.K."}
    ];
    knex.insert(addresses_pool).into('addresses')
    .finally(() => { knex.destroy() });
  })
  .catch(function (error) {
    console.log(error);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('addresses')
};
