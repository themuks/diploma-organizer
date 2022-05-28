import {
    CLEAR_ERROR,
    CREATE_REMINDER,
    FETCH_REMINDER,
    FETCH_REMINDERS,
    HIDE_LOADER,
    SET_ERROR,
    SHOW_LOADER
} from "./types";

const initialState = {
    reminders: [],
    isLoading: false,
    hasError: false,
    errorMessage: ""
};

const remindersReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_REMINDER:
            return {
                ...state,
                reminders: [...state.reminders, payload]
            };
        case FETCH_REMINDER:
            return {
                ...state,
                reminder: payload
            };
        case FETCH_REMINDERS:
            return {
                ...state,
                reminders: payload
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

export default remindersReducer;