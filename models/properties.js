'use strict';

let Bookshelf = require('../db/bookshelf');

require('./addresses');
var Properties = Bookshelf.Model.extend({
  tableName: 'properties',
  softDelete: true,
  hasTimestamps: true,

  Addresses: function() {
    return this.hasMany('Addresses');
  }
});

module.exports = Bookshelf.model('Properties', Properties);
