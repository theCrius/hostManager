"use strict";
const migrate = require('widget-knex-schema');
const propertiesSchema = require('../schemas/properties');
const uuid = require('uuid/v5');

exports.up = function(knex, Promise) {
  return migrate.createTable(knex, 'properties', propertiesSchema, true)
  .then(function () {
    const seed = '15276b3c-3e4c-41c4-a03f-65ea5148e12a';
    const properties_pool = [
      {"id": 1, "uuid": uuid('1carlos', seed), "owner": "carlos", "airbnbId": 3512500, "numberOfBedrooms": 1, "numberOfBathrooms": 1, "incomeGenerated": 2000.34},
      {"id": 2, "uuid": uuid('2ankur', seed), "owner": "ankur", "airbnbId": 1334159, "numberOfBedrooms": 3, "numberOfBathrooms": 1, "incomeGenerated": 10000},
      {"id": 3, "uuid": uuid('3elaine', seed), "owner": "elaine", "airbnbId": 12220057, "numberOfBedrooms": 2, "numberOfBathrooms": 2, "incomeGenerated": 1200}
    ];
    knex.insert(properties_pool).into('properties')
    .finally(() => { knex.destroy() });
  })
  .catch(function (error) {
    console.log(error);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('properties');
};
