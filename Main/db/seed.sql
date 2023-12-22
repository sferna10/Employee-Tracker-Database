USE employees;

/* === || DEPARTMENT ARRAY || === */
INSERT INTO department (names)
VALUES ("Sales");
INSERT INTO department (names)
VALUES ("Engineering");
INSERT INTO department (names)
VALUES ("Finance");
INSERT INTO department (names)
VALUES ("Legal");
INSERT INTO department (names)
VALUES ("Human Resources");




/* === || ROLE ARRAY || === */
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 95000, 1);
/* Sales Department */
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);
INSERT INTO role (title,salary, department_id)
VALUES ("Technitian", 56000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Sotware_Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant_Manager", 140000, 3);


/* === || EMPLOYEE ARRAY || === */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* John Doe - Sales Lead - Sales Department */
VALUES ("John", "Doe", 1, null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* Silvia Fernandez - Manager - Engineer Department */
VALUES ("Ale", "Seas", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* Denise Watson - Account Manager- Accounting Department */
VALUES ("Denise", "Watson", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* Silvia Fernandez - Manager - Sales Department */
VALUES ("Nicholas", "Hover", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* Denise Watson - Professional 1- Legal Department */
VALUES ("Silvia", "Fernandez", 5, null);