import axios from "axios";
import authHeader from "./auth-header";

class UserService {

    #resourceName;

    constructor() {
        this.#resourceName = "users";
    }

    getCurrentUser() {
        return axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}/me`, { headers: authHeader() });
    }

    update(data) {
        return axios.put(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}/me`, data, { headers: authHeader() });
    }

}

export default new UserService();