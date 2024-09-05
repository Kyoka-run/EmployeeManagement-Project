import React, { Component } from 'react';
import EmployeeDataService from  '../service/EmployeeDataService.jsx';
import withRouter from './withRouter';
import AuthenticationService from '../service/AuthenticationService.jsx';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography } from '@mui/material';

class ListEmployeesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            message: null
        }
        this.refreshEmployees = this.refreshEmployees.bind(this);
        this.deleteEmployeeClicked = this.deleteEmployeeClicked.bind(this);
        this.updateEmployeeClicked = this.updateEmployeeClicked.bind(this);
        this.addEmployeeClicked = this.addEmployeeClicked.bind(this);
    }

    componentDidMount() {
        this.refreshEmployees();
    }

    refreshEmployees() {
        EmployeeDataService.retrieveAllEmployees()
           .then(response => {
                console.log(response);
                this.setState({employees: response.data});
           }
        ).catch(error => {
            return error;
        });
    }

    deleteEmployeeClicked(id) {
        EmployeeDataService.deleteEmployee(id)
            .then(
                response => {
                    this.setState({ message: "Employee deleted successfully!"})
                    this.refreshEmployees()
                }
            ).catch(error => {
                return error;
            })
    }

    updateEmployeeClicked(id) {
        console.log('update ' + id)
        this.props.navigation(`/employees/${id}`)
    }

    addEmployeeClicked() {
        this.props.navigation('/employees/-1')
    }

    render() {
        if (!AuthenticationService.isUserLoggedIn()) {
            this.props.navigation('/login');
        } else {
            return (
                <div className="container">
                    <Typography variant="h4" gutterBottom>
                        All Employees
                    </Typography>
                    {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Position</TableCell>
                                    <TableCell>Department</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Projects</TableCell>
                                    <TableCell>Update</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.employees.map(
                                        employee =>
                                            <TableRow key={employee.id}>
                                                <TableCell>{employee.id}</TableCell>
                                                <TableCell>{employee.name}</TableCell>
                                                <TableCell>{employee.position}</TableCell>
                                                <TableCell>{employee.department}</TableCell>
                                                <TableCell>{employee.email}</TableCell>
                                                <TableCell>{employee.projects.join(', ')}</TableCell> 
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => this.updateEmployeeClicked(employee.id)}>
                                                        Update
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => this.deleteEmployeeClicked(employee.id)}>
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div className='row' style={{ marginTop: '20px' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.addEmployeeClicked}>
                            Add Employee
                        </Button>
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(ListEmployeesComponent);