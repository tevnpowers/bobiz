'use strict';

var global = require('./config');
var posts = require('../app/controllers/businesses');
// var reviews = require('../app/controllers/reviews');

module.exports = function(app) {
  app.get(global.apiPrefix + '/businesses',
    function(req, res) {
      posts.index.json(req, res);
    }
  );

  app.get(global.apiPrefix + '/businesses/:id',
    function(req, res) {
      posts.index.json(req, res);
    }
  );

  app.get(global.apiPrefix + '/businesses/:id/reviews',
    function(req, res) {
      reviews.index.json(req, res);
    }
  );
};
