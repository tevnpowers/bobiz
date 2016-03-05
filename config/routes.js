'use strict';

var global = require('./config');
var posts = require('../app/controllers/posts');

module.exports = function(app) {
  app.get(global.apiPrefix + '/posts',
    function(req, res) {
      posts.index.json(req, res);
    }
  );
};
