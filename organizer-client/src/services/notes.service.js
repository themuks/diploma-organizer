import axios from "axios";
import authHeader from "./auth-header";

class NotesService {

    #resourceName;

    constructor() {
        this.#resourceName = "notes";
    }

    getNotes() {
        return axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}`, { headers: authHeader() });
    }

    getNote(id) {
        return axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}/${id}`, { headers: authHeader() });
    }

    createNote(data) {
        return axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}/`, data, { headers: authHeader() });
    }

    updateNote(id, data) {
        return axios.patch(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}/${id}`, data, { headers: authHeader() });
    }

    deleteNote(id) {
        return axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/${this.#resourceName}/${id}`, { headers: authHeader() });
    }

}

export default new NotesService();