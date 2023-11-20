const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");

init();

//Display logo text, load main prompts
function init() {
    const logoText = logo({ name: "Employee Manager" }).render();

    console.log(logoText);

    loadMainPrompts(); 
}

function loadMainPrompts() {
    return inquirer.prompt([
       {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            {
             name: "View All Employees",
             value: "VIEW_EMPLOYEES"
            },
            {
              name: "View All Employees By Department",
              value: "VIEW_EMPLOYEES_BY_DEPARTMENT"   
            },
            {
               name: "View All Employees By Manager",
               value: "VIEW_EMPLOYEES_BY_MANAGER"   
            }, 
            {
               name: "Add Employee",
               value: "ADD_EMPLOYEE"
            },
            {
               Name: "Remove Employee",
               value: "REMOVE_EMPLOYEE"   
            },
            {
                name: "Update Employee Role",
                value: "UPDATE_EMPLOYEE_ROLE"   
            }, 
            {
                name: "Update Employee Manager",
                value: "UPDATE_EMPLOYEE_MANAGER"   
            },
            {
                name: "View All Roles",
                value: "VIEW_ROLES"
            },
            {  
                name: "Add Role",
                value: "ADD_ROLE"
            },
            {
                name: "Remove Role",
                value: "REMOVE_ROLE"
            },
            {
                name: "View All Departments",
                value: "VIEW_DEPARTMENTS"
            },
            {
                name:  "Add Department",
                value: "ADD_DEPARTMENT"
            },
            {   name: "Remove Department",
                value: "REMOVE_DEPARTMENT"
            },
            {
                name:  "View Total Utilized Budget By Department",
                value:  "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT"
            },
            {
                name:   "Quit",
                value:  "QUIT"
            }
        ]
    }
]).then(res => {
    let choice = res.choice;

    //call the appropriate function
    switch (choice) {
        case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        viewEmployeesByDepartment();
        break;
    case "VIEW_EMPLOYEES_BY_MANAGER":
        viewEmployeesByManager();
        break;
    case "ADD_EMPLOYEE":
        addEmployee();
        break;
    case "REMOVE_EMPLOYEE":
        removeEmployee();
        break;
    case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
    case "UPDATE_EMPLOYEE_MANAGER":
        updateEmployeeManager();
        break;
    case "VIEW_DEPARTMENTS":
        view_Departments();
        break;
    case "ADD_DEPARTMENT":
        addDepartment();
        break;
    case "REMOVE_DEPARTMENT":
        removeDepartment();
        break;
    case "VIEW_UTILIZED_BUDGET_BY_DEPARTMENT":
        viewUtilizedBudgetByDepartment();
        break;
    case "VIEW_ROLES":
        viewRoles();
        break;
    case "ADD_ROLE":
        addRole();
        break;
    case "REMOVE_ROLE":
        removeRole();
        break;
      default:
        quit();                      
    }
}
)    
}
//View all employees
function viewEmployees() {
    db.findAllEmployees()
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
    })
    .then(() => loadMainPrompts());
}  

//View all employees that belong to a department
function viewEmployeesByDepartment() {
    db.findAllDepartments()
      .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map (({ id, name }) => ({
            name: name,
            value: id
}));

    return inquirer.prompt([
        {
            type: "list",
            name: "departmentId",
            message: "Which department would you like to see employees for?",
            choices: departmentChoices
        }
    ])
      .then(res => db.findAllEmployeeByDepartment(res.departmentId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.log(employees); 
    })
    .then(() => loadMainPrompts())
}));

//View all employees that report to a specific manager
function viewEmployesByManager() {
    db.findAllEmployees()
        .then(([rows]) => {
            let managers = rows;
            const managerChoices = managers.map(({ id, first_name, last_name}) => ({
                name: `${first_name} ${last_name}`,
                value: id           
        }));
        }
        return inquirer.prompt([
        {
            type: "list",
            name: "managerId",
            message: "Which employee do you want to see direct reports for?",
            choices: managerChoices
        }
    ])
    .then(res => db.findAllEmployeesByManager(res.managerId))
    .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        if (employees.length === 0) {
          console.log("The selected employee has no direct reports");
        } else {
          console.table(employees);
        }
    })
    .then(() => loadMainPrompts())
};

//Delete an employee
function removeEmployee() {
    db.findAllEmployee() 
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
    }));

    return inquirer.prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee do  you want to remove?",
            choices: employeeChoices
        }
    ])    
        .then(res => db.removeEmployee(res.employeeId))
        .then(() => console.log("Removed employee from the database")) 
        .then(() => loadMainPrompts())
})
}
//Update an employee's role
function updateEmployeeRole() {
    db.findAllEmployees()
        .then(([rows]) => {
        let employees = rows;
        const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
})); 
  
    return inquirer.prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employee's role do you want to update?",
            choices: employeeChoices
        }
    ])
        .then(res => {
            let employeeId =res.employeeId;
            db.findAllRoles()
                .then(([rows]) =>{
                  let roles = rows;
                  const roleChoices = roles.map(({ id, title }) => ({
                    name: title,
                    value: id            
                  }));

            return inquirer.prompt([
        {
            type: "list",
            name: "roleId",
            message: "Which role do you want to assign the selected employee?",
            choices: roleChoices
        }
    ])
        .them(res => db.updateEmployeeRole(employeeId, res.roleId))
        .then(() => console.log("updated employee's role"))
        .then(() => loadMainPrompts())
        });
    });
    })
}
//Update an employee's manager
    function updateEmployeeManager() {
        db.findAllEmployee()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            return inquirer.prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee's manager do you want to update?",
                    choices: employeeChoices
                }
            ])
                 .then(res => {
                    let employeeId = res.employeeId
                    db.findAllPossibleManagers(employeeId)
                    .then(([rows]) => {
                        let managers = rows;
                        const managerChoices = manageers.map(({ id, first_name, last_name}) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                        }));
                    
                        return inquirer.prompt([  
                       {
                    type: "list",
                    name: "roleId",
                    message: "Which employes do you want to set as manager for the selected employees?",
                    choices: managerChoices
                    }
                ])
                    .them(res => db.updateEmployeeManager(employeeId, res.managerId))
                    .then(() => console.log("updated employee's manager"))
                    .then(() => loadMainPrompts())
                    })
                })
            })
 }
//View all roles
function viewRoles() {
    db.findAllRoles()
    .then(([rows]) => {
        let roles = rows;
        console.log('\n');
        console.table(roles);
    })
        .then(() => loadMainPrompts());
}

//Add a role
function addRole() {
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        const departmentChoices = departments.map(({ id, name }) => ({
            name: name,
            value: id
        }));

        return inquirer.prompt([
        {
            type: "title",
            name: "What is the name of the role?"
        },
        {
            type: "salary",
            name: "What is the salary of the role?"
        },
        {
            type: "list",
            name: "department_id",
            message: "Which department does the role belong to?",
            choices: departmentChoices
        }
          ])
          .then(role => {
            db.createRole(role)
               .then(() => console.log(`Added $(role.title) to thhe database`))
               .then(() => loadMainPrompts())
          })
        })
    }

    //Delete a role
    function removeRole() {
        db.findAllRoles()
    .then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
        }));

        return inquirer.prompt([
        {
            type: "title",
            name: "roleId",
            message: "Which role do you want to remove? (Warning: This will also remove employees",
            choices: roleChoices
        }
        ])
            .then(res => db.removeRole(res.roleId))
            .then(() => console.log("Removed role from the database"))
            .then(() => loadMainPrompts())
          })
        }
//View all departments
function viewDepartments() {
    db.findAllDepartments()
    .then(([rows]) => {
        let departments = rows;
        console.log('\n');
        console.table(departments);
    })
        .then(() => loadMainPrompts());
}
    
// Add a department
function addDepartment() {
   return inquirer.prompt([
    {
        name: "name",
        message: "What is the name of the Department?"   
    }
   ])
   .then(res => {
     let name = res;
    db.createDepartment(name)
   .then(() => console.log(`Added $(name.name) to the database`))
   .then(() => loadMainPrompts())
    })
}
 // Delete a department
function removeDepartment() {
    db.findAllDepartment()
    .then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    return inquirer.prompt({
        type: "list",
        name: "departmentId",
        message: "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
        choices: departmentChoices
    });


//View all departments and show their total utilized department budget
function viewUtilizedBudgetDepartment() {
    db.viewDepartmentBudgets()
    then(([rows]) => {
        let departments = rows;
        console.log('\n');
        console.table(departments);
    })
        .then(() => loadMainPrompts());
}})


//Add an employee
function addEmployee() {
    return inquirer.prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?",  
    },
    {
      name: "last_name",
      message: "What is the employee's last name?",  
      },
    ])
     .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;

        db.findAllRoles()
        .then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
            name: title,
            value: id
}));
    prompt({
        type: "list",
        name: "roleId",
        message: "What is the employee's role",
        choices: roleChoices
    })
        .then(res => {
            let roleId = res.roleId;

            db.findAllEmployees()
                .then(([rows]) => {
                  let employees = rows;
                  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                    name: `${first_name} ${last_name}`,
                    value: id
                }));

                managerChoices.unshift({ name: "None", value: null });

                return inquirer.prompt({
                    type: "list",
                    name: "managerId",
                    message: "Who is the employee's manager?",
                    choices: managerChoices
                })
                    .then(res => {
                      let employee = {
                        manager_id: res.managerId,
                        role_id: roleId,
                        first_name: firstName,
                        last_name: lastName
                      }
                      
                      db.createEmployee(employee);
                    })
                    .then(() => console.log(
                        `Added ${firstName} ${lastName} to the database`
                    ))
                    .then(() => loadMainPrompts())
                    })    
                })
            })
     })
    }
}
    //Exit the aplication
    function quit() {
        console.log("Goodbye!");
        process.exit();
    }
     