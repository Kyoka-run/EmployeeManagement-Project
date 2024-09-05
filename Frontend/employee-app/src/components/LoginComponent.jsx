import AuthenticationService from "../service/AuthenticationService";
import withRouter from './withRouter.jsx';
import { MContext } from './MyProvider.jsx';
import React , { Component } from "react";
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';

class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "manbo",
            password: "manbo",
            hasLoginDFailed: false,
            showSuccessMessage: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange(event) {
         this.setState({ 
            [event.target.name]: event.target.value
         })
    }

    loginClicked(context) {
        AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
                context.setIsUserLoggedIn(true)
                this.props.navigation('/employees')
            }).catch(() => {
                context.setIsUserLoggedIn(false)
                this.setState({ hasLoginFailed: false })
                this.setState({ showSuccessMessage: true })
            })
    }

    render() {
        return (
            <Container maxWidth="sm">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 3,
                        border: '1px solid grey',
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <Typography variant="h4" gutterBottom data-testid="loginHeader">
                        Login
                    </Typography>
                    <div className="container">
                        {this.state.hasLoginFailed && <Alert severity="error">Invalid Credentials</Alert>}
                        {this.state.showSuccessMessage && <Alert severity="success">Login Successful</Alert>}
                        <TextField
                            data-testid="username"
                            label="User Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        <TextField
                            data-testid="password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <MContext.Consumer>
                            {(context) => (
                                <Button
                                    data-testid="login"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={() => { this.loginClicked(context) }}
                                    sx={{ mt: 2 }}
                                >
                                    Login
                                </Button>
                            )}
                        </MContext.Consumer>
                    </div>
                </Box>
            </Container>
        );
    }
}

export default withRouter(LoginComponent);
