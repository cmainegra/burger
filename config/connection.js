var mysql = require("mysql");
require('dotenv/config');

var connection = mysql.createConnection({
  host: "localhost",
  port: process.env.SQL_PORT,
  user: process.env.SQL_ROOT_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
module.exports = connection;