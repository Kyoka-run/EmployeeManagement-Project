import React, { Component } from "react";
import EmployeeDataService from "../service/EmployeeDataService";
import ProjectDataService from "../service/ProjectDataService";
import withRouter from './withRouter';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Box, Typography, Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material'; 

class EmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: "",
            position: "",
            department: "",
            email: "",
            projects: [], 
            allProjects: []
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.handleProjectChange = this.handleProjectChange.bind(this);
    }

    componentDidMount() {
        console.log(this.state.id)
        if (Number(this.state.id) === -1) {
            return;
        }

        EmployeeDataService.retrieveEmployee(this.state.id)
           .then(response => 
                this.setState({
                name: response.data.name,
                position: response.data.position,
                department: response.data.department,
                email: response.data.email
                }))
            .catch(error => {
                console.error("There was an error retrieving the employee:", error);
            });

        ProjectDataService.retrieveAllProjects()
            .then(response => {
                this.setState({ allProjects: response.data });
            })
            .catch(error => {
                console.error("There was an error retrieving the projects:", error);
            });
    }

    validate(values) {
        let errors = {};
        if (!values.name) {
            errors.name = "Name is required";
        }
        if (!values.position) {
            errors.position = "Position is required";
        }
        if (!values.department) {
            errors.department = "Department is required";
        }
        if (!values.email) {
            errors.email = "Email is required";
        }
        return errors;
    }


    onSubmit(values) {
        let employee = {
            id: this.state.id,
            name: values.name,
            position: values.position,
            department: values.department,
            email: values.email,
            projects: this.state.projects
        }

        if (Number(this.state.id) === -1) {
            EmployeeDataService.createEmployee(employee)
               .then(() => this.props.navigation('/employees'))
        } else {
            EmployeeDataService.updateEmployee(this.state.id, employee)
               .then(() => this.props.navigation('/employees'))
        }
        console.log(values);
    }

    handleProjectChange(event) {
        this.setState({ projects: event.target.value });
    }

    render() {
        let { id, name, position, department, email, projects, allProjects } = this.state;
        return (
            <Box sx={{ margin: 'auto', width: '50%', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Employee Form
                </Typography>
                <Formik
                    initialValues={{ id, name, position, department, email }}
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
                                    label="Position"
                                    name="position"
                                    variant="outlined"
                                    value={values.position}
                                    onChange={handleChange}
                                    error={touched.position && Boolean(errors.position)}
                                    helperText={touched.position && errors.position}
                                />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Department"
                                    name="department"
                                    variant="outlined"
                                    value={values.department}
                                    onChange={handleChange}
                                    error={touched.department && Boolean(errors.department)}
                                    helperText={touched.department && errors.department}
                                />
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    variant="outlined"
                                    value={values.email}
                                    onChange={handleChange}
                                    error={touched.email && Boolean(errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </Box>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>Projects</InputLabel>
                                <Select
                                    multiple
                                    value={projects}
                                    onChange={this.handleProjectChange}
                                    renderValue={(selected) => selected.map((proj) => proj.name).join(', ')}
                                >
                                    {allProjects.map((project) => (
                                        <MenuItem key={project.id} value={project}>
                                            <Checkbox checked={projects.includes(project)} />
                                            <ListItemText primary={project.name} />
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

export default withRouter(EmployeeComponent);