import React, { Component } from 'react';
import ProjectDataService from  '../service/ProjectDataService.jsx';
import withRouter from './withRouter.jsx';
import AuthenticationService from '../service/AuthenticationService.jsx';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography } from '@mui/material';

class ListProjectsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            message: null
        }
        this.refreshProjects = this.refreshProjects.bind(this);
        this.deleteProjectClicked = this.deleteProjectClicked.bind(this);
        this.updateProjectClicked = this.updateProjectClicked.bind(this);
        this.addProjectClicked = this.addProjectClicked.bind(this);
    }

    componentDidMount() {
        this.refreshProjects();
    }

    refreshProjects() {
        ProjectDataService.retrieveAllProjects()
           .then(response => {
                console.log(response);
                this.setState({projects: response.data});
           }
        ).catch(error => {
            return error;
        });
    }

    deleteProjectClicked(id) {
        ProjectDataService.deleteProject(id)
            .then(
                response => {
                    this.setState({ message: "Project deleted successfully!"})
                    this.refreshProjects();
                }
            ).catch(error => {
                return error;
            })
    }

    updateProjectClicked(id) {
        console.log('update ' + id)
        this.props.navigation(`/projects/${id}`)
    }

    addProjectClicked() {
        this.props.navigation('/projects/-1')
    }

    render() {
        if (!AuthenticationService.isUserLoggedIn()) {
            this.props.navigation('/login');
        } else {
            return (
                <div className="container">
                    <Typography variant="h4" gutterBottom>
                        All Projects
                    </Typography>
                    {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Employees</TableCell>
                                    <TableCell>Update</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.projects.map(
                                        project =>
                                            <TableRow key={project.id}>
                                                <TableCell>{project.id}</TableCell>
                                                <TableCell>{project.name}</TableCell>
                                                <TableCell>{project.description}</TableCell>
                                                <TableCell>{project.employees.join(', ')}</TableCell> 
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => this.updateProjectClicked(project.id)}>
                                                        Update
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => this.deleteProjectClicked(project.id)}>
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
                            onClick={this.addProjectClicked}>
                            Add Project
                        </Button>
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(ListProjectsComponent);
