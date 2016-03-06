var env = process.env.NODE_ENV || 'development';
var mysql      = require('mysql');
var config = require('./config')[env];

var connection = mysql.createConnection({
  host     : config.mysql.host,
  user     : config.mysql.user,
  password : config.mysql.password,
  database : config.mysql.database
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

