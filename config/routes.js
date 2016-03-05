'use strict';

var global = require('./config');
var posts = require('../app/controllers/businesses');

module.exports = function(app) {
  app.get(global.apiPrefix + '/businesses',
    function(req, res) {
      posts.index.json(req, res);
    }
  );
};
