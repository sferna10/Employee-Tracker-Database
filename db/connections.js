const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",

    //Username
    user: "root",

    //Password
    password: "TorreMolinos 22!",
    database: "employees"
});

connection.connect(function(err){
    if (err) throw err;
});

module.exports = connection;