'use strict';

var global = require('./config/config');
var crypto = require('crypto');
var url = require('url');
var logger = require('winston');
logger.setLevels(logger.config.syslog.levels);

// below from http://stackoverflow.com/questions/13063350/node-js-incoming-request-sourceip
exports.getClientIp = function(req) {
  var ipAddress = null;
  var forwardedIpsStr = req.headers['x-forwarded-for'];
  if (forwardedIpsStr) {
    ipAddress = forwardedIpsStr[0];
  }
  if (!ipAddress) {
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};

// For CORS cross-domain requests
// TODO: Better solution will require examining OPTIONS.
exports.allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', global.corsAllowOrigin);
  // res.header('Access-Control-Allow-Credentials',true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
};

exports.auth = function(req, res, next) {
  if (req.isAuthenticated() === false) {
    res.send(401);
  } else {
    next();
  }
};

exports.dateFromId = function(mongoId) {
  return mongoId.getTimestamp();
};

exports.die = function(message) {
  console.log(message);
  process.exit(1);
};

exports.encrypt = function(message, key) {
  if (!message) {
    return '';
  }
  var cipher = crypto.createCipher('aes-256-cbc', key);
  var result = cipher.update(message, 'utf8', 'hex');
  result += cipher.final('hex');
  return result;
};

exports.decrypt = function(message, key) {
  if (!message) {
    return '';
  }
  var decipher = crypto.createDecipher('aes-256-cbc', key);
  var decrypted = decipher.update(message, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

exports.basePath = function(rootUrl, p) {
  if (!p) {
    return '';
  }
  p = p.replace(rootUrl, '');
  var components = url.parse(p).pathname.split('/');

  for (var i = 0; i < components.length; i++) {
    if (components[i].length !== 0) {
      return components[i];
    }
  }
  return '';
};

exports.normalizePhone = function(p) {
  if (!p) {
    return '';
  }
  p = JSON.stringify(p);
  var re = new RegExp('[^\\d]', 'g');
  var result = p.replace(re, '');
  if (result.length === 10) {
    // assume US num
    result = '+1' + result;
  }
  if (result.length === 11) {
    result = '+' + result;
  }
  return result;
};

exports.mediaUrlsFromMessageToArray = function(message) {
  var result = [];
  for (var key in message) {
    if (/^MediaUrl[0-9]/.test(key)) {
      result.push(message[key]);
    }
  }
  return result;
};

exports.isPhoneValid = function(phoneNumber) {
  return /^\+{0,1}1\d{10}$/.test(phoneNumber);
};

// TODO: properly use JWT
exports.newToken = function(secret) {
  if (secret === undefined) {
    throw new Error('secret is required');
  }
  var jwt = require('jwt-simple');
  var r = crypto.pseudoRandomBytes(256).toString('base64');
  var token = jwt.encode(r, secret);
  return token;
};

exports.handleControllerError = function(moduleName, httpStatus, err, httpErrMessage, res) {
  logger.error(moduleName + ': ' + err);
  res.json(httpStatus, httpErrMessage);
};
