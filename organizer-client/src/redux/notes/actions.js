import NotesService from "../../services/notes.service";
import { CLEAR_ERROR, FETCH_NOTES, HIDE_LOADER, SET_ERROR, SHOW_LOADER } from "./types";

export const createNote = (note) => (dispatch) => {

};

export const getNotes = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
    dispatch({
        type: SHOW_LOADER
    });

    return NotesService.getNotes().then(
        response => {
            dispatch({
                type: FETCH_NOTES,
                payload: response.data
            });

            return Promise.resolve();
        },
        error => {
            dispatch({
                type: SET_ERROR,
                payload: "Error"
            });
        })
        .finally(() => {
            dispatch({
                type: HIDE_LOADER
            });
        });
};