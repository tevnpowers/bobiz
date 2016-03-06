'use strict';

var fs = require('fs');
var global = require('./config');
var businesses = require('../app/controllers/businesses');
// var reviews = require('../app/controllers/reviews');

module.exports = function(app) {
  app.get(global.apiPrefix + '/businesses',
    function(req, res) {
      businesses.index.json(req, res);
    }
  );

  app.get(global.apiPrefix + '/businesses/:id',
    function(req, res) {
      businesses.findOne.json(req, res);
    }
  );

  app.get(global.apiPrefix + '/businesses/:id/reviews',
    function(req, res) {
      businesses.findBusinessReviews.json(req, res);
    }
  );

  app.get(global.apiPrefix + '/businesses/search/:name',
    function(req, res) {
      businesses.searchBusinesses.json(req, res);
    }
  );

  app.post('/submitbusiness', function(req, res) {
      console.log(req.body);
      res.send("Business submission placeholder...");
  });

  app.post('/createuser', function(req, res) {
      console.log(req.body);
      res.send("Create user placeholder...");
  });

};
