USE employees;

/* === || DEPARTMENT ARRAY || === */
INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

NSERT INTO department (name)
VALUES ("HUMAN RESOURCES");




/* === || ROLE ARRAY || === */
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 95000, 1);
/* Sales Department */
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);

INSERT INTO role (title,salary, department_id)
VALUES ("Technitian, 56000, 1)


/
/* === || EMPLOYEE ARRAY || === */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* John Doe - Sales Lead - Sales Department */
VALUES ("John", "Doe", 1, null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
/* Silvia Fernandez - Manager - Sales Department */
VALUES ("Silvia", "Fernandez", 1, 1);
