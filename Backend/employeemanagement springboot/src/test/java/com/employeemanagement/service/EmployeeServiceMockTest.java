package com.employeemanagement.service;

import com.employeemanagement.exception.EmployeeNotFoundException;
import com.employeemanagement.model.Employee;
import com.employeemanagement.repository.EmployeeRepository;
import com.employeemanagement.service.impl.EmployeeServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
public class EmployeeServiceMockTest {
    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeService employeeService = new EmployeeServiceImpl();

    @Test
    public void getAllEmployees() {
        List<Employee> employees = Arrays.asList(
            new Employee(10001L,"Manbo","Manager","Finance","114514@gmail.com"),
            new Employee(10002L,"Manbo","Manager","Human Resources","114515@gmail.com")
        );

        when(employeeRepository.findAll()).thenReturn(employees);

        assertEquals(employees,employeeService.getAllEmployees());
    }

    @Test
    public void getEmployee() {
        Employee employee =  new Employee(10001L,"Manbo","Manager","Finance","114514@gmail.com");

        when(employeeRepository.findById(10001L)).thenReturn(Optional.of(employee));

        assertEquals(employee,employeeService.getEmployee(10001L));
    }

    @Test
    public void getEmployeeNotFound() {
        EmployeeNotFoundException exception = assertThrows(
                EmployeeNotFoundException.class,
                () -> employeeService.getEmployee(10001L),
                "Employee id not found : 10001");

        assertEquals("Employee id not found : 10001",exception.getMessage());
    }

    @Test
    public void deleteEmployee() {
        Employee employee = new Employee(10001L,"Manbo","Manager","Finance","114514@gmail.com");

        when(employeeRepository.findById(10001L)).thenReturn(Optional.of(employee));

        employeeService.deleteEmployee(10001L);

        verify(employeeRepository,times(1)).deleteById(10001L);
    }

    @Test
    public void createEmployee() {
        Employee employee = new Employee(10001L,"Manbo","Manager","Finance","114514@gmail.com");

        when(employeeRepository.save(employee)).thenReturn(employee);

        assertEquals(employee,employeeService.createEmployee(employee));
    }

    @Test
    public void updateEmployee() {
        Employee employee = new Employee(10001L,"Manbo","Manager","Finance","114514@gmail.com");

        when(employeeRepository.save(employee)).thenReturn(employee);

        assertEquals(employee,employeeService.updateEmployee(employee,10001L));
    }
}
