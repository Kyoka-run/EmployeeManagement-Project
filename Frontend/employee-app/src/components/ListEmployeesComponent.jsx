import React, { Component } from 'react';
import EmployeeDataService from  '../service/EmployeeDataService.jsx';
import withRouter from './withRouter';
import AuthenticationService from '../service/AuthenticationService.jsx';

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
            this.props.navigation('/login')
        } else {
            return (
                <div className="container">
                    <h3>All Employees</h3>
                    {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Department</th>
                                    <th>Email</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee =>
                                            <tr key={employee.id}>
                                                <td>{employee.id}</td>
                                                <td>{employee.name}</td>
                                                <td>{employee.position}</td>
                                                <td>{employee.department}</td>
                                                <td>{employee.email}</td>
                                                <td>
                                                    <button className='btn btn-success' onClick={
                                                        () => this.updateEmployeeClicked(employee.id)}>
                                                        Update
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className='btn btn-warning' onClick={
                                                        () => this.deleteEmployeeClicked(employee.id)}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='row'>
                        <button className='btn btn-success' onClick={this.addEmployeeClicked}>
                            Add
                        </button>
                    </div>
                </div>
            );
        }
    }    
}

export default withRouter(ListEmployeesComponent);