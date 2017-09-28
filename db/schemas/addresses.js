"use strict";

module.exports = {
  id: {type: 'increments', nullable: false, primary: true},
  property_id: {type: 'integer', nullable: false, unsigned: true},
  line1: {type: 'string', maxlength: 250, nullable: false},
  line2: {type: 'string', maxlength: 250, nullable: true, default: null},
  line3: {type: 'string', maxlength: 250, nullable: true, default: null},
  line4: {type: 'string', maxlength: 250, nullable: false},
  postcode: {type: 'string', maxlength: 250, nullable: false},
  city: {type: 'string', maxlength: 250, nullable: false},
  country: {type: 'string', maxlength: 250, nullable: false},
};
