import React, { Component } from "react";
import EmployeeDataService from "../service/EmployeeDataService";
import withRouter from './withRouter';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class EmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: "",
            position: "",
            department: "",
            email: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        console.log(this.state.id)
        if (Number(this.state.id) === -1) {
            return
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
            email: values.email
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

    render() {
        let { id,name,position,department,email,error } = this.state
        return (
            <div>
                <h3>Employee</h3>
                <div className="container">
                    <Formik
                        initialValues={{ id, name,position,department,email }}
                        onSubmit={this.onSubmit}
                        validateOnChange={true}
                        validateOnBlur={true}
                        validate={this.validate}
                        enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="id" disabled />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="name" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Position</label>
                                        <Field className="form-control" type="text" name="position" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Department</label>
                                        <Field className="form-control" type="text" name="department" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Email</label>
                                        <Field className="form-control" type="text" name="email" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }    
}

export default withRouter(EmployeeComponent);