import axios from "axios";

class AuthService {

    login(email, password) {
        return axios
            .post(`${process.env.REACT_APP_BACKEND_API_URL}/login`, new URLSearchParams({
                email,
                password
            }))
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(email, password) {
        return axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/users`, {
            email,
            password
        });
    }
}

export default new AuthService();