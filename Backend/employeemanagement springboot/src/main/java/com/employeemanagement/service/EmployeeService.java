package com.employeemanagement.service;

import java.util.List;

import com.employeemanagement.model.Employee;


public interface EmployeeService {
	List<Employee> getAllEmployees();
	Employee getEmployee(Long id);
	void deleteEmployee(Long id);
	Employee createEmployee(Employee employee);
	Employee updateEmployee(Employee employee,Long id);
}
