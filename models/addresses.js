'use strict';

let Bookshelf = require('../db/bookshelf');

require('./properties');
var Addresses = Bookshelf.Model.extend({
  tableName: 'addresses',
  hasTimestamps: true,

  Properties: function() {
    return this.belongsTo('Properties');
  }
});

module.exports = Bookshelf.model('Addresses', Addresses);
