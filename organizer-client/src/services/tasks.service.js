import axios from "axios";
import authHeader from "./auth-header";

class TasksService {

    #resourceName;

    constructor() {
        this.#resourceName = "tasks";
    }

    getAll() {
        return axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}`, { headers: authHeader() });
    }

    getById(id) {
        return axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}/${id}`, { headers: authHeader() });
    }

    create(data) {
        return axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}/`, data, { headers: authHeader() });
    }

    update(id, data) {
        return axios.put(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}/${id}`, data, { headers: authHeader() });
    }

    partialUpdate(id, data) {
        return axios.patch(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}/${id}`, data, { headers: authHeader() });
    }

    delete(id) {
        return axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}/${id}`, { headers: authHeader() });
    }

    schedule() {
        return axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}/schedule`, {}, { headers: authHeader() });
    }

}

export default new TasksService();