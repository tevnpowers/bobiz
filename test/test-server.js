'use strict';
/* eslint-env mocha */
/* eslint camelcase: [2, {properties: "never"} ] */


var expect = require('must');
var global = require('../config/config');
var app = require('../server');
var request = require('supertest');
var qs = require('qs');

describe('Business API GET', function() {
  it('returns business info from repo', function(done) {
    .get('/api/businesses/')
    .expect(200)
    .end(function(err,res) {
      expect(err).to.be.null();
      console.log('body: ' + JSON.stringify(res));
      res.body.Name.must.equal("MINI LOVE ARROWS");
      res.body.Address.must.equal(4227420);
      res.body.Hours.must.equal("2.00");
      res.body.Social.must.equal("2.00");
      res.body.Phone.must.equal("2.00");
      res.body.Website.must.equal("2.00");
      res.body.Category.must.equal("2.00");
      res.body.ProfileImage.must.equal("2.00");
      res.body.DaysOpen.must.equal("2.00");
      res.body.Descriptions.must.equal("2.00");
      res.body.Email.must.equal("2.00");
      res.body.Status.must.equal("2.00");
      done();
    });
  });
});

describe('Reviews API GET', function() {
  it('returns reviews from ')
}

