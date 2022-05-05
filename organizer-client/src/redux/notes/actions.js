import NotesService from "../../services/notes.service";
import { CLEAR_ERROR, CREATE_NOTE, FETCH_NOTE, FETCH_NOTES, HIDE_LOADER, SET_ERROR, SHOW_LOADER } from "./types";

export const createNote = (note) => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
    dispatch({
        type: SHOW_LOADER
    });

    return NotesService.create(note).then(
        response => {
            dispatch({
                type: CREATE_NOTE,
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

export const deleteNote = (id) => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
    dispatch({
        type: SHOW_LOADER
    });

    return NotesService.delete(id).then(
        response => Promise.resolve(),
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

export const updateNote = (id, note) => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
    dispatch({
        type: SHOW_LOADER
    });

    return NotesService.update(id, note).then(
        response => Promise.resolve(),
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

export const getNote = (id) => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
    dispatch({
        type: SHOW_LOADER
    });

    return NotesService.getById(id).then(
        response => {
            dispatch({
                type: FETCH_NOTE,
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

export const getNotes = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
    dispatch({
        type: SHOW_LOADER
    });

    return NotesService.getAll().then(
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