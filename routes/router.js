'use strict';
const errorHandler = require('./errorHandler');
const apiController = require('../controllers/apiController');

module.exports = (app) => {
  app.route('/properties')
  .get(apiController.list, errorHandler)
  .post(apiController.create, errorHandler)
  .put(apiController.update, errorHandler)

  app.route('/properties/:id')
  .get(apiController.view, errorHandler)
  .delete(apiController.del, errorHandler);
}
