const knex = require('knex')(require('./knexfile'));
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('registry');
bookshelf.plugin(require('bookshelf-paranoia'), { field: 'deletedAt' });

module.exports = bookshelf;
