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
      res.body.Name.must.equal('black hairspot');
      res.body.Address.must.equal('123 main street');
      res.body.Hours.must.equal('');
      res.body.Social.must.equal('/facebook/blakspot');
      res.body.Phone.must.equal('12063047128');
      res.body.Website.must.equal('http://www.blakspothair.com');
      res.body.Category.must.equal('Hair Salon');
      res.body.ProfileImage.must.equal('http://blakspothair.s3.amazon.com/blahblah.jpg');
      res.body.DaysOpen.must.equal('M-F');
      res.body.Descriptions.must.equal('Get your hair did');
      res.body.Email.must.equal('blak@blakspot.com');
      res.body.Status.must.equal('Active');
      done();
    });
  });
});

describe('Reviews API GET', function() {
  it('returns reviews from ')
}

