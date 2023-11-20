const connection = require("./connections");

class DB {
    //Keeping a reference to the connection on the class in case we need it later
constructor(connection) {
    this.connection = connection;
}
 
    //Find all employees, join with roles and departments to display their roles, salaries, departments and managers
findAllEmployees() {
    return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department, names AS department, role.salary, CONCAT(manager, first_name, last_name)"
    );
}
//Find all employees except the given employee id
findAllPossibleManagers(employeeId) {
    return this.connection.promise().query(
        "SELECT id, first_name, last_name FROM employee WHERE !=?",
        employeeId
    );
}
//Create a new employee
createEmployee(employee) {
    return this.connection.promise().query("INSERT INTO employee SET ?", employee);
}
//Remove an employee wiht the given id
removeEmployee(employeeId) {
    return this.connection.promise().query(
      "DELETE FROM  employee WHERE id = ?",
      employeeId
    );
}
//Update the given employee's role
updateEmployeeRole(employeeId, roleId) {
return this.connection.connection.promise().query {
    "UPDATE employee SET role_Id = ? WHERE id = ?",
    {roleId, employeeId}
);
}
//Update the given employee's manager
this.updateEmployeeManager(employeeId, managerId) {
    return this.connection.promise().query(
"UPDATE employee SET manager_id = ? WHERE id = ?"
    {managerId, employeeId}
);
}
//Find all roles, join with departments to display the department name
findAllRoles() {
    return this.connection.promise().query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
    );
}   
//Create a new role
createRole(role) {
    return this.connection.promise().query("INSERT INTO ROLE SET ?", role);
}

//Remove a role from the db
removeRole(roleId) {
    return this.connection.promise().query("DELETE FROM role WHERE id = ?,  roleId");
}
//Find all departments
findAllDepartments() {
    return this.connection.promise().query(
        "SELECT department.id, department.name FROM department;"
    );
}
//Find all departments, join with employees and roles and sum up utilized departments budget
viewDepartmentBudget() {
    return this.connection.promise().query(
        "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOINT department on role.department"
    );
}
//Create a new department
createDepartment(department) {
    return this.connection.promise().query("INSERT INTO department SET ?", department);
}

//Remove a department
removeDepartment(departmentId) {
    return this.connection.promise().query(
        "DELETE FROM department WHERE id = ?",
        departmentId
    );
}
//Find all the employees in a given department, join with roles to display role titles
findAllEmployeesByDepartment(departmentId) {
    return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_Id = role.id LEFT JOIN department",
        departmentId
    );
}
//Find all employees by manager, join with departments and roles to display titles and department names
this.findAllEmployeesByManager(managerId) {
    return this.connection.promise().query(
        "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = ",
        managerId
    );
}
}

module.exports = new DB(connection);