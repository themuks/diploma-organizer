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

    getCurrentUserRecommendations() {
        return axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}/me/recommendations`, { headers: authHeader() });
    }

    getCurrentUserStatistics() {
        return axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}/me/statistics`, { headers: authHeader() });
    }

    search(query) {
        return axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}/me/entities?filter=${query}`, { headers: authHeader() });
    }

}

export default new UserService();