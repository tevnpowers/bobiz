'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('./config/logger');
var env = process.env.NODE_ENV || 'development';
var global = require('./config/config');
var config = require('./config/config')[env];
var util = require('./util');
var mongoose = require('mongoose');
var fs = require('fs');

logger.info('environment: ' + env);

// connect mongoose
if(!mongoose.connection.readyState) {
  logger.info('connecting to mongo at ' + config.db);
  mongoose.connect(config.db, function(err) {
    if (err) throw err;
    console.log("Connected to Mongo at: " + config.db);
  });
}

// boostrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function(file) {
    logger.info('loading model(s) from: ' + models_path + '/' + file);
    if (~file.indexOf('.js')) {
        require(models_path + '/' + file);
    }
});

var app = express();

// general app configuration
app.use(util.allowCrossDomain);
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

logger.info('allowing origin: ' + JSON.stringify(global.corsAllowOrigin));

require('./config/routes')(app);

// mysql connection file, comment out if mysql is not set up
// require('./config/mysql.js');

app.listen(config.port, function() {
  logger.log('info', 'environment: ' + env);
  logger.log('info', 'server started on port ' + config.port);
});

module.exports = app;