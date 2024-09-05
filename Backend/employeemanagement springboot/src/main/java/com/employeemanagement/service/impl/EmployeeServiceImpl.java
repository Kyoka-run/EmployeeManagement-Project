package com.employeemanagement.service.impl;

import java.util.List;
import java.util.Optional;

import com.employeemanagement.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.employeemanagement.model.Employee;
import com.employeemanagement.service.EmployeeService;
import com.employeemanagement.exception.EmployeeNotFoundException;

@Service
public class  EmployeeServiceImpl implements EmployeeService{
	
	@Autowired
	private EmployeeRepository employeeRepository;

	@Override
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}

	@Override
	public Employee getEmployee(Long id) {
	    return employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException(id));
	}

	@Override
	public void deleteEmployee(Long id) {
		Optional<Employee> employee = employeeRepository.findById(id);
		if(employee.isPresent()) {
			employeeRepository.deleteById(id);
		} else {
			throw new EmployeeNotFoundException(id);
		}
	}

	@Override
	public Employee createEmployee(Employee employee) {
		Employee createdEmployee = employeeRepository.save(employee);
		return createdEmployee;
	}

	@Override
	public Employee updateEmployee(Employee employee,Long id) {
		Employee updatedEmployee = employeeRepository.save(employee);
		return updatedEmployee;
	}

	@Override
	public Optional<Employee> searchEmployee(Long id) {
		Optional<Employee> employee = employeeRepository.findById(id);
		if(!employee.isPresent()) {
			throw new EmployeeNotFoundException(id);
		}
		return employee;
	}
}
