# EmployeeTrackerMySQL

In MySQL:

Drop database if exitst, create database, use was used to create schema 
create table was used to create 4 tables - employee, role, department and manager.
Each table has primary key and in addition to it foreign key was generated if necessary to connnect the table
Data has been seeded using insert into

In server file:

MySQL and inquirer npms were used to connect with workbench and prompt questions in command terminal
User input was taken using runsearch function which prompts the user to select viewing and modifiying table contents. Following functions were assigned for viewing and modifying the content

allEmployee();
viewByDepartment();
viewByManager();
addEmployee();
removeEmployee();
updateRole();
updateManager();
exit

