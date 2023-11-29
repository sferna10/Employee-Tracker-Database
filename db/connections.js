import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",

  //Username
  user: "root",

  //Password
  password: "TorreMolinos 22!",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
});

export default connection;
