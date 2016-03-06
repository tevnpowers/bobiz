var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'mysql://b1391827c26625:92b4493e@us-cdbr-iron-east-03.cleardb.net/heroku_e8f7abf289cece7?reconnect=true',
  user     : '',
  password : '',
  database : 'heroku_e8f7abf289cece7'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

