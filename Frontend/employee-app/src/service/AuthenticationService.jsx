import axios from "axios";
const Employee_API = 'http://localhost:8080/api';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get(Employee_API + '/basicauth', {
            headers: {
                authorization: this.createBasicAuthToken(username, password)
            }})
    }

    createBasicAuthToken(username, password) {
        return 'Basic '+ btoa(username + ':' + password);
    }

    registerSuccessfulLogin(username,password) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if (user === null) return false;
        return true;
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        this.setupAxiosInterceptors("");
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => this.setAuthorizationHeader(config, token)
        )
    }

    setAuthorizationHeader(config, token) {
        if (this.isUserLoggedIn()) {
            config.headers.Authorization = token;
        }
        return config;
    }
}

export default new AuthenticationService();