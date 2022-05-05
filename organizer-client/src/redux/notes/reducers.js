import { CLEAR_ERROR, CREATE_NOTE, FETCH_NOTE, FETCH_NOTES, HIDE_LOADER, SET_ERROR, SHOW_LOADER } from "./types";

const initialState = {
    notes: [],
    isLoading: false,
    hasError: false,
    errorMessage: ""
};

const notesReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_NOTE:
            return {
                ...state,
                notes: [ ...state.notes, payload ]
            };
        case FETCH_NOTE:
            return {
                ...state,
                note: payload
            }
        case FETCH_NOTES:
            return {
                ...state,
                notes: payload
            };
        case SHOW_LOADER:
            return {
                ...state,
                isLoading: true
            };
        case HIDE_LOADER:
            return {
                ...state,
                isLoading: false
            };
        case SET_ERROR:
            return {
                ...state,
                hasError: true,
                errorMessage: payload
            };
        case CLEAR_ERROR:
            return {
                ...state,
                hasError: false,
                errorMessage: ""
            };
        default:
            return state;
    }
};

export default notesReducer;