# Employee Management System - Spring Boot & React & My SQL

## Project Overview
The Employee Management System is a full-stack web application designed to manage employee and project information. It is built using Spring Boot for the back-end and React for the front-end, with MySQL as the database layer. This application supports CRUD operations for managing employees and projects and features user authentication and authorization.

## Features
- **User Authentication**: Secure login and logout functionality.
- **Employee Management**: Add, update, and remove employee information.
- **Project Management**: Assign employees to projects and track project progress.
- **Many-to-Many Relationship Management**: When an employee or project is updated, the changes are reflected in all associated entities. 
- **Search and Filter**: Search employees and projects by name with dynamic filtering.
- **Bulk Delete**: Allows for the bulk deletion of employees and projects.

## ⚙️ Technologies Used

### Front-end
- **React** (Functional components, hooks)
- **Material-UI** (for UI components)
- **Axios** (for HTTP requests)
  
### Back-end
- **Spring Boot** (RESTful API development)
- **Spring Security** (Authentication and Authorization)
  
### Database
- **MySQL** (Relational database for storing employee and project data)

## 📦 Installation Guide

### Prerequisites
- **Java 17+**
- **Node.js** (v16+)
- **MySQL**
  
### Steps to Set Up the Back-End (Spring Boot)
1. Clone the repository:  
   ```bash
   git clone https://github.com/Kyoka-run/EmployeeManagement-Project.git

2. Set up the MySQL database:
   Open MySQL and create a new schema
   ```bash
   CREATE DATABASE employee_management;
   Update the application.properties file with your MySQL credentials:
   ```bash
   spring.datasource.url=jdbc:mysql://localhost:3306/employee_management
   spring.datasource.username=YOUR_MYSQL_USERNAME
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

3. Run the application

### Steps to Set Up the Front-End (React)

1. Install dependencies:
    Navigate to the frontend directory and install dependencies:
    ```bash
    cd frontend
    npm install

2. Run the front-end application:
    Start the React development server:
    ```bash
    npm start

The application will be accessible at http://localhost:3000.

##  Application Screenshots
