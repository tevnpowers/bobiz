'use strict';
/* eslint-env mocha */
/* eslint camelcase: [2, {properties: "never"} ] */


var expect = require('must');
var global = require('../config/config');
var app = require('../server');
var request = require('supertest');
var qs = require('qs');

describe('Business API GET', function() {
  it('returns posts from', function(done) {
    .get('/api/businesses/')
    .expect(200)
    .end(function(err,res) {
      expect(err).to.be.null();
      console.log('body: ' + JSON.stringify(res));
      res.body.Name.must.equal("MINI LOVE ARROWS");
      res.body.StyleId.must.equal(4227420);
      res.body.Price.must.equal("2.00");
      done();
    });
  });
});

