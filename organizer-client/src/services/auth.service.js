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
                    localStorage.setItem("userEmail", JSON.stringify(email))
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("userEmail");
        return Promise.resolve();
    }

    register(user) {
        return axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/users`, user);
    }

}

export default new AuthService();