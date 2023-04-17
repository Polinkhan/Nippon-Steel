const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.MYQSL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYQSL_DATABASE,
});

module.exports = db;
