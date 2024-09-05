import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import ListEmployeesComponent from "./ListEmployeesComponent.jsx";
import EmployeeComponent from "./EmployeeComponent.jsx";
import LoginComponent from './LoginComponent.jsx';
import LogoutComponent from './LogoutComponent.jsx';
import MenuComponent from './MenuComponent.jsx';
import MyProvider from './MyProvider.jsx';
import ListProjectsComponent from "./ListProjectsComponent.jsx";
import ProjectComponent from "./ProjectComponent.jsx";

class EmployeeApp extends Component {
  render() {
    return (
        <>
          <MyProvider>
            <MenuComponent />
            <Routes>
                <Route path="/" element={<LoginComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/logout" element={<LogoutComponent />} />
                <Route path="/employees" element={<ListEmployeesComponent/>} />
                <Route path="/employees/:id" element={<EmployeeComponent/>} />
                <Route path="/projects" element={<ListProjectsComponent/>} />
                <Route path="/projects/:id" element={<ProjectComponent/>} />
            </Routes>
          </MyProvider>
        </>
    )
  }
}

export default EmployeeApp;