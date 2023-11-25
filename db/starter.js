const inquirer = require("inquirer");
const mysql = require("mysql2")
const db = require("./db/connections")

const connection = require("./connections");

class DB {
    //Keeping a reference to the connection on the class in case we need it later
constructor(connection) {
    this.connection = connection;
}
 
    //Find all employees, join with roles and departments to display their roles, salaries, departments and managers
findAllEmployees() {
    return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department, names AS department, role.salary, CONCAT(manager.first_name, '',manager.last_name) AS manager"
    );
}}
