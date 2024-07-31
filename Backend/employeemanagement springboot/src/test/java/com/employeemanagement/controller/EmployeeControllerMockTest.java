package com.employeemanagement.controller;

import com.employeemanagement.model.Employee;
import com.employeemanagement.service.EmployeeService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;

@ExtendWith(SpringExtension.class)
@WebMvcTest(value = EmployeeController.class)
@AutoConfigureMockMvc(addFilters = false)
@ActiveProfiles("test")
public class EmployeeControllerMockTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmployeeService employeeService;

    private static final ObjectMapper om = new ObjectMapper();

    Employee mockEmployee = new Employee(10001L,"Manbo","Manager","Finance","114514@gmail.com");

    String exampleEmployeeJson = "{\"id\":10001,\"name\":\"Manbo\",\"position\":\"Manager\",\"department\":\"Finance\",\"email\":\"114514@gmail.com\"}";

    @Test
    public void getEmployee() throws Exception {
        Mockito.when(employeeService.getEmployee(10001L)).thenReturn(mockEmployee);

        RequestBuilder requestBuilder = MockMvcRequestBuilders.get("/employees/{id}",10001L)
                .accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        JSONAssert.assertEquals(exampleEmployeeJson,result.getResponse().getContentAsString(),false);
    }

    @Test
    public void createEmployee() throws Exception {
        Employee employee = new Employee(10001L, "Manbo", "Manager", "Finance", "114514@gmail.com");

        Mockito.when(employeeService.createEmployee(Mockito.any(Employee.class))).thenReturn(employee);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/employees").content(exampleEmployeeJson).contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = result.getResponse();

        assertEquals(HttpStatus.CREATED.value(),response.getStatus());
        assertEquals("http://localhost/employees/10001",response.getHeader(HttpHeaders.LOCATION));
    }

    @Test
    public void updateEmployee() throws Exception {
        Employee employee = new Employee(10001L, "Manbo", "Manager", "Finance", "114514@gmail.com");

        Mockito.when(employeeService
                .updateEmployee(Mockito.any(Employee.class),Mockito.anyLong()))
                .thenReturn(employee);

        String employeeString = om.writeValueAsString(employee);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .put("/employees/10001")
                .contentType(MediaType.APPLICATION_JSON)
                .content(employeeString);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = result.getResponse();

        assertEquals(HttpStatus.OK.value(),response.getStatus());
        JSONAssert.assertEquals(exampleEmployeeJson, response.getContentAsString(),false);
    }

    @Test
    public void deleteEmployee() throws Exception {
        doNothing().when(employeeService).deleteEmployee(10001L);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .delete("/employees/10001");

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = result.getResponse();

        assertEquals(HttpStatus.NO_CONTENT.value(),response.getStatus());
    }
}
