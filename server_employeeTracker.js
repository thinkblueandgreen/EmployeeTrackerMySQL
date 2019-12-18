var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Rocket123$",
    database: "employee_tracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
    console.log("Port connected");
});

function runSearch() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "View All Employees By Department",
                "View All Employees By Manager",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Update Employee Manager",
                "exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View All Employees":
                    allEmployee();
                    break;

                case "View All Employees By Department":
                    viewByDepartment();
                    break;

                case "View All Employees By Manager":
                    viewByManager();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Update Employee Role":
                    updateRole();
                    break;

                case "Update Employee Manager":
                    updateManager();
                    break;

                case "exit":
                    break;
            }
        });
}

function allEmployee() {

    var query = "SELECT employeeTableAlias.id, employeeTableAlias.first_name, employeeTableAlias.last_name, roleTableAlias.salary, roleTableAlias.title, managerTableAlias.manager, departmentTableAlias.department " +
        "FROM employee_tracker_db.employee employeeTableAlias " +
        "INNER JOIN employee_tracker_db.role roleTableAlias ON employeeTableAlias.role_id=roleTableAlias.id " +
        "INNER JOIN employee_tracker_db.manager managerTableAlias ON employeeTableAlias.manager_id=managerTableAlias.id " +
        "inner join employee_tracker_db.department departmentTableAlias on roleTableAlias.department_id=departmentTableAlias.id;";

    connection.query(query, function (err, res) {
        var output = ''
        console.log("-------------------------------------------------------------------------------")
        console.log("ID" + "\t" + "FirstName" + "\t" + "LastName" + "\t" + "Title" + "Department" + "\t" + "Salary" + "\t" + "Manager");
        console.log("-------------------------------------------------------------------------------")
        for (var i = 0; i < res.length; i++) {
            output = (output + res[i].id + "\t" + res[i].first_name + "\t\t" + res[i].last_name + "\t\t" + res[i].title + "\t\t" + res[i].department + "\t" + res[i].salary + "\t" + res[i].manager + "\n");
        }
        console.log(output);
        runSearch();
    });
    
}

function viewByDepartment() {

    inquirer
        .prompt([
            {
                name: "departmentName",
                type: "input",
                message: "Enter the department name (english or spanish): ",
            }
        ])
        .then(function (answer) {

            var query = "SELECT employeeTableAlias.id, employeeTableAlias.first_name, employeeTableAlias.last_name, roleTableAlias.salary, roleTableAlias.title, managerTableAlias.manager, departmentTableAlias.department " +
                "FROM employee_tracker_db.employee employeeTableAlias " +
                "INNER JOIN employee_tracker_db.role roleTableAlias ON employeeTableAlias.role_id=roleTableAlias.id " +
                "INNER JOIN employee_tracker_db.manager managerTableAlias ON employeeTableAlias.manager_id=managerTableAlias.id " +
                "inner join employee_tracker_db.department departmentTableAlias on roleTableAlias.department_id=departmentTableAlias.id " +
                "Where departmentTableAlias.department = ?";

            connection.query(query, [answer.departmentName], function (err, res) {

                var output = ''
                console.log("-------------------------------------------------------------------------------")
                console.log("ID" + "\t" + "FirstName" + "\t" + "LastName" + "\t" + "Title" + "Department" + "\t" + "Salary" + "\t" + "Manager");
                console.log("-------------------------------------------------------------------------------")
                for (var i = 0; i < res.length; i++) {
                    output = (output + res[i].id + "\t" + res[i].first_name + "\t\t" + res[i].last_name + "\t\t" + res[i].title + "\t" + res[i].department + "\t" + res[i].salary + "\t" + res[i].manager + "\n");
                }
                console.log(output);
                runSearch();
            });
        }
        )
}

function viewByManager() {

    inquirer
        .prompt([
            {
                name: "managerName",
                type: "input",
                message: "Enter the department name (Mathi, Sandra or Rebecca): ",
            }
        ])
        .then(function (answer) {

            var query = "SELECT employeeTableAlias.id, employeeTableAlias.first_name, employeeTableAlias.last_name, roleTableAlias.salary, roleTableAlias.title, managerTableAlias.manager, departmentTableAlias.department " +
                "FROM employee_tracker_db.employee employeeTableAlias " +
                "INNER JOIN employee_tracker_db.role roleTableAlias ON employeeTableAlias.role_id=roleTableAlias.id " +
                "INNER JOIN employee_tracker_db.manager managerTableAlias ON employeeTableAlias.manager_id=managerTableAlias.id " +
                "inner join employee_tracker_db.department departmentTableAlias on roleTableAlias.department_id=departmentTableAlias.id " +
                "Where managerTableAlias.manager = ?";

            connection.query(query, [answer.managerName], function (err, res) {
                var output = ''
                console.log("-------------------------------------------------------------------------------")
                console.log("ID" + "\t" + "FirstName" + "\t" + "LastName" + "\t" + "Title" + "Department" + "\t" + "Salary" + "\t" + "Manager");
                console.log("-------------------------------------------------------------------------------")
                for (var i = 0; i < res.length; i++) {
                    output = (output + res[i].id + "\t" + res[i].first_name + "\t\t" + res[i].last_name + "\t\t" + res[i].title + "\t" + res[i].department + "\t" + res[i].salary + "\t" + res[i].manager + "\n");
                }
                console.log(output);
                runSearch();
            });
        }
        )
};

function addEmployee() {
    inquirer
        .prompt([{
            name: "firstname",
            type: "input",
            message: "What is the employee first name?"
        },
        {
            name: "lastname",
            type: "input",
            message: "What is the employee last name?"
        },
        {
            name: "role",
            type: "input",
            message: "What is your role id?"
        },
        {
            name: "manager",
            type: "input",
            message: "What is your manager's id?"
        }]
        )
        .then(function (answer) {
            var query = "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(? , ?, ? , ?); "

            connection.query(query, [answer.firstname, answer.lastname, answer.role, answer.manager], function (err, res) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Record has been added")
                }
                runSearch();
            });
        });
}

function removeEmployee() {
    inquirer
        .prompt({
            name: "id",
            type: "input",
            message: "Type in the employee's id whom you want to remove from database?"
        })
        .then(function (answer) {
            connection.query("DELETE FROM employee WHERE id = ?;", [answer.id], function (err, res) {
                console.log(`Employeer ${answer.id} is deleted from database`)
                runSearch();
            });
        });
};

function updateRole() {
    inquirer
        .prompt([
            {
                name: 'id',
                type: 'input',
                message: "What is the employee's id?"
            },
            {
                name: 'newid',
                type: 'input',
                message: "What is employee's new role id?"
            }
        ]).then(answer => {
            connection.query(`UPDATE employee SET role_id = ${answer.newid} WHERE id=${answer.id}`, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(res)
                }
            })
        })
};

function updateManager() {
    inquirer
        .prompt([
            {
                name: 'id',
                type: 'input',
                message: "What is the employee's id?"
            },
            {
                name: 'newManagerid',
                type: 'input',
                message: "What is employee's new manager id (press 1 for Mathi, 2 for Sandy, 3 for Rebeca?"
            }
        ]).then(answer => {
            connection.query(`UPDATE employee SET role_id = ${answer.newManagerid} WHERE id=${answer.id}`, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(res)
                }
            })
        })
};