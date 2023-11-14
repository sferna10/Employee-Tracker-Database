const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");

Init();

//Display logo text, load main prompts
function init() {
    const logoText = logo({ name: "Employee Manager" }).render();

    console.log(logoText);

    loadMainPrompts() {
}}

function loadMainPrompts() {
    prompt({
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

    //call teh appropriate fucntion
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
}]

//View all employees
function viewEmployees() {
    db.findAllEmployees()

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

    prompt([
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
    });
} 
//View all employees that report to a specific manager
function viewEmployesByManager() {
    db.findAllEmployees()
        .then(([rows]) => {
            let managers = rows;
            const managerChoices = managers.map(({ id, first_name, Last_name}) => ({
                name: ${first_name} ${last_name} ,
                value: id           
        })};

    prompt([
        {
            type: "list",
            name: "managerId",
            message: "Which employee do you want to see direct reports for?",
            choices: managerChoices
        }
    ])

        }


    ])