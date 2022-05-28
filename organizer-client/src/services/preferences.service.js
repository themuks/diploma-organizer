import axios from "axios";
import authHeader from "./auth-header";

class TasksService {

    #resourceName;

    constructor() {
        this.#resourceName = "users/me/preferences";
    }

    getCurrentUserPreferences() {
        return axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}`, { headers: authHeader() });
    }

    update(data) {
        return axios.put(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}`, data, { headers: authHeader() });
    }

}

export default new TasksService();