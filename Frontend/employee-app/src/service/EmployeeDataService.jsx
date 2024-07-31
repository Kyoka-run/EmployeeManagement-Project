import axios from 'axios';

const USER = 'manbo'
const PASSWORD = 'manbo'
const Employee_API_URL = 'http://localhost:8080/api/employees';

const authHeader = {
    headers: {
        Authorization: 'Basic ' + btoa(USER + ':' + PASSWORD)
    }
};

class EmployeeDataService {
    retrieveAllEmployees() {
        return axios.get(Employee_API_URL, authHeader).then(response => {
            console.log('API Response:', response);
            return response;
        }); 
    }

    deleteEmployee(id) {
        return axios.delete(Employee_API_URL + '/' +id, authHeader);
    }

    updateEmployee(id,employee) {
        return axios.put(Employee_API_URL + '/' + id, employee, authHeader);
    }

    createEmployee(employee) {
        return axios.post(Employee_API_URL, employee, authHeader);
    }

    retrieveEmployee(id) {
        return axios.get(Employee_API_URL + '/' + id, authHeader);
    }
}


export default new EmployeeDataService();