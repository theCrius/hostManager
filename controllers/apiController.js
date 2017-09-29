'use strict';
const Promise = require('bluebird');
const async = require('async');
const _ = require('lodash');
const moment = require('moment');

const Bookshelf = require('../db/bookshelf');
const Properties = require('../models/properties');
const Addresses = require('../models/addresses');

module.exports = {list, view, create, update, del};

//Filter out the old version of the various property details and return only the most recent one, if not deleted
function list(req, res, next) {
  const latest = Bookshelf.knex('properties').max('id as id').groupBy('uuid');
  Bookshelf.knex.distinct('id').from(latest.clone().as('id'))
  .then((data) => {
    Properties.where( 'id', 'in', data.map((el)=>el.id) ).fetchAll({withRelated: ['Addresses']})
    .then((data) => {res.send(data)})
    .catch((err) => next(err));
  })
  .catch((err) => { next(err) });
};

//Full history of a property, first element is always the most recent one
function view(req, res, next) {
  Properties.query((qb) => {
    qb.where('uuid', '=', req.params.id).orderBy('id','DESC')
  }).fetchAll({withRelated: ['Addresses']})
  .then((data) => { res.send(data) })
  .catch((err) => { next(err) })
};

//Just create a new property using a transaction
function create(req, res, next) {
  const uuid = require('uuid/v5');
  let addressPayload = req.body.Addresses[0]; delete req.body.Addresses;
  let propertyPayload = req.body;
  Bookshelf.transaction((t) => {
    req.body.uuid = uuid(req.body.owner+req.body.incomeGenerated, process.env.seed);
    return new Properties(propertyPayload)
    .save(null, {transacting: t})
    .tap((property) => {
      return new Addresses(addressPayload).save({'property_id': property.id}, {transacting: t});
    });
  }).then((property) => {
    res.send(property)
  }).catch(function(err) {
    next(err);
  });
};

//Create a new entry for the property with the updated info, using the same uuid
function update(req, res, next) {
  const uuid = require('uuid/v5');
  let addressPayload = req.body.Addresses[0];
  delete addressPayload.created_at;
  addressPayload.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
  let propertyPayload = req.body;
  delete propertyPayload.Addresses; delete propertyPayload.created_at;
  propertyPayload.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
  Bookshelf.transaction((t) => {
    return new Properties(propertyPayload)
    .save(null, {transacting: t})
    .tap((property) => {
      return new Addresses(addressPayload).save({'property_id': property.id}, {transacting: t});
    });
  }).then((property) => {
    Properties.where({id:property.id}).fetch({withRelated: ['Addresses']})
    .then((data) => { res.send(data) })
    .catch((err) => { next(err) })
  }).catch(function(err) {
    next(err);
  });
};

//Soft delete a property
function del(req, res, next) {
  Properties.query((qb) => {
    qb.select('id').where('uuid', '=', req.params.id)
  }).fetchAll()
  .then((list) => {
    async.each(list.toJSON(), (el, callback) => {
      new Properties({id: el.id})
      .destroy()
      .then((model) => {
        callback();
      })
      .catch((err) => callback(err));
    }, (error) => {
      if(error) next(error);
      else res.send({uuid: req.params.id});
    })
  })
  .catch((err) => { next(err) })
};
