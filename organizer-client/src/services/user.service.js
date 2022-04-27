import axios from "axios";
import authHeader from "./auth-header";

class UserService {

    getTasks() {
        return axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/tasks`, { headers: authHeader() });
    }

}

export default new UserService();