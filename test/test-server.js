'use strict';
/* eslint-env mocha */
/* eslint camelcase: [2, {properties: "never"} ] */

var expect = require('must');
var global = require('../config/config');
var app = require('../server');
var request = require('supertest');
var qs = require('qs');




describe('Businesses API GET', function() {
  it('returns businesses from repo', function(done) {
    request(app)
    .get('/api/businesses/')
    .expect(200)
    .end(function(err,res) {
      expect(err).to.be.null();
      console.log('body: ' + JSON.stringify(res));
      res.body.length.must.equal(20);
      done();
    });
  });

  it('returns a single business info from repo', function(done) {
    request(app)
    .get('/api/businesses/1234')
    .expect(200)
    .end(function(err,res) {
      expect(err).to.be.null();
      console.log('body: ' + JSON.stringify(res));
      res.body.name.must.equal('black hairspot');
      res.body.address.must.equal('123 main street');
      res.body.hours.must.equal('');
      res.body.social.must.equal('/facebook/blakspot');
      res.body.phone.must.equal('12063047128');
      res.body.website.must.equal('http://www.blakspothair.com');
      res.body.category.must.equal('Hair Salon');
      res.body.profileImage.must.equal('http://blakspothair.s3.amazon.com/blahblah.jpg');
      res.body.daysOpen.must.equal('M-F');
      res.body.descriptions.must.equal('Get your hair did');
      res.body.email.must.equal('blak@blakspot.com');
      res.body.status.must.equal('Active');
      done();
    });
  });
});

describe('Reviews API GET', function() {
  it('returns reviews from a business', function() {
    request(app)
    .get('/api/businesses/12345/reviews')
    .expect(200)
    .end(function(err,res) {
      expect(err).to.be.null();
      res.body.length.should.equal(10);
      done();
    });
  });
});

