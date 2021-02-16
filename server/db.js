const Pool = require('pg').Pool;
const mysql = require('mysql');

const pool = new Pool({
  user: process.env.DB_PGSQL_USER,
  password: process.env.DB_PGSQL_PWD,
  host: process.env.HOST,
  port: 5432,
  database: process.env.DATABASE,
});

const mysqlConn = mysql.createConnection({
  user: DB_MYSQL_USER,
  password: '',
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: 3306,
});

mysqlConn.connect((err) => {
  if (err) console.log(err.message);
  console.log('Sukses koneksi ke database');
});

pool.connect().then((res) => {
  console.log('Success connecting to postgres');
});

module.exports = { pool, mysqlConn };
