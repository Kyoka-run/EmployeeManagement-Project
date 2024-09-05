import axios from 'axios';

const USER = 'manbo'
const PASSWORD = 'manbo'
const Project_API_URL = 'http://localhost:8080/api/projects';

const authHeader = {
    headers: {
        Authorization: 'Basic ' + btoa(USER + ':' + PASSWORD)
    }
};

class ProjectDataService {
    retrieveAllProjects() {
        return axios.get(Project_API_URL, authHeader).then(response => {
            console.log('API Response:', response);
            return response;
        }); 
    }

    deleteProject(id) {
        return axios.delete(Project_API_URL + '/' +id, authHeader);
    }

    updateProject(id,project) {
        return axios.put(Project_API_URL + '/' + id, project, authHeader);
    }

    createProject(project) {
        return axios.post(Project_API_URL, project, authHeader);
    }

    retrieveProject(id) {
        return axios.get(Project_API_URL + '/' + id, authHeader);
    }
}


export default new ProjectDataService();