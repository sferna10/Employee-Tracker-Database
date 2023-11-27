import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "127.0.0.1",

  //Username
  user: "root",

  //Password
  password: "TorreMolinos 22!",
  database: "employees",
});

connection.connect(function (err) {
  if (err) throw err;
});

export default connection;
