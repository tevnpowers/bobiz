'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('./config/logger');
var env = process.env.NODE_ENV || 'development';
var global = require('./config/config');
var config = require('./config/config')[env];
var util = require('./util');

logger.info('environment: ' + env);

var app = express();

// general app configuration
app.use(util.allowCrossDomain);
app.use(cookieParser());
app.use(bodyParser.json());

logger.info('allowing origin: ' + JSON.stringify(global.corsAllowOrigin));

require('./config/routes')(app);

app.listen(config.port, function() {
  logger.log('info', 'environment: ' + env);
  logger.log('info', 'server started on port ' + config.port);
});

module.exports = app;