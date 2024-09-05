import React, { Component } from "react";
import EmployeeDataService from "../service/EmployeeDataService";
import ProjectDataService from "../service/ProjectDataService"; 
import withRouter from './withRouter';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Box, Typography, Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';

class ProjectComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: "",
            description: "",
            employees: [], 
            allEmployees: []
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
    }

    componentDidMount() {
        console.log(this.state.id)
        if (Number(this.state.id) === -1) {
            return;
        }
        ProjectDataService.retrieveProject(this.state.id) 
           .then(response => 
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                }))
            .catch(error => {
                console.error("There was an error retrieving the project:", error);
            });

        EmployeeDataService.retrieveAllEmployees()
            .then(response => {
                this.setState({ allEmployees: response.data });
            })
            .catch(error => {
                console.error("There was an error retrieving the employees:", error);
            });
    }

    validate(values) {
        let errors = {};
        if (!values.name) {
            errors.name = "Name is required";
        }
        if (!values.description) {
            errors.description = "Description is required";
        }
        return errors;
    }

    onSubmit(values) {
        let project = {
            id: this.state.id,
            name: values.name,
            description: values.description,
        }

        if (Number(this.state.id) === -1) {
            ProjectDataService.createProject(project) 
               .then(() => this.props.navigation('/projects')) 
        } else {
            ProjectDataService.updateProject(this.state.id, project) 
               .then(() => this.props.navigation('/projects')) 
        }
        console.log(values);
    }

    handleEmployeeChange(event) {
        this.setState({ employees: event.target.value });
    }

    render() {
        let { id, name, description, employees, allEmployees } = this.state;
        return (
            <Box sx={{ margin: 'auto', width: '50%', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Project Form
                </Typography>
                <Formik
                    initialValues={{ id, name, description }}
                    onSubmit={this.onSubmit}
                    validateOnChange={true}
                    validateOnBlur={true}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    {({ values, handleChange, handleSubmit, errors, touched }) => (
                        <Form onSubmit={handleSubmit}>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Id"
                                    name="id"
                                    variant="outlined"
                                    value={values.id}
                                    disabled
                                />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    variant="outlined"
                                    value={values.name}
                                    onChange={handleChange}
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    variant="outlined"
                                    value={values.position}
                                    onChange={handleChange}
                                    error={touched.position && Boolean(errors.position)}
                                    helperText={touched.position && errors.position}
                                />
                            </Box>
                            
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Employees</InputLabel>
                                <Select
                                    multiple
                                    value={employees}
                                    onChange={this.handleEmployeeChange}
                                    renderValue={(selected) => selected.map((emp) => emp.name).join(', ')} // 显示选中的员工名称
                                >
                                    {allEmployees.map((employee) => (
                                        <MenuItem key={employee.id} value={employee}>
                                            <Checkbox checked={employees.includes(employee)} />
                                            <ListItemText primary={employee.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button variant="contained" color="primary" type="submit">
                                Save
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        );
    }  
}

export default withRouter(ProjectComponent);
