"use strict";

module.exports = {
  id: {type: 'increments', nullable: false, primary: true, unique: true},
  uuid: {type: 'uuid', nullable: false},
  owner: {type: 'string', maxlength: 250, nullable: false},
  airbnbId: {type: 'integer', unsigned: true, nullable: false},
  numberOfBedrooms: {type: 'integer', unsigned: true, nullable: false},
  numberOfBathrooms: {type: 'integer', unsigned: true, nullable: false},
  incomeGenerated: {type: 'decimal', precision: 8, scale: 2, unsigned: true, nullable: false},
  deletedAt: {type: 'dateTime', nullable: true}
};
