import {
    CHANGE_TASK_STATUS,
    CLEAR_CREATE_ERROR,
    CLEAR_DELETE_ERROR,
    CREATE_TASK,
    DELETE_TASK,
    FETCH_TASKS,
    HIDE_CREATE_LOADER,
    HIDE_DELETE_LOADER,
    SET_CREATE_ERROR,
    SET_DELETE_ERROR,
    SHOW_CREATE_LOADER,
    SHOW_DELETE_LOADER
} from "./types";
import { CLEAR_ERROR, HIDE_LOADER, SET_ERROR, SHOW_LOADER } from "../notes/types";

const initialState = {
    tasks: [],
    isLoading: false,
    isError: false,
    isCreateError: false,
    errorMessage: ""
};

const tasksReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_TASK:
            return {
                ...state,
                tasks: [payload, ...state.tasks]
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== payload.id)
            };
        case FETCH_TASKS:
            return {
                ...state,
                tasks: payload
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
                isError: true,
                errorMessage: payload
            };
        case CLEAR_ERROR:
            return {
                ...state,
                isError: false
            };


        case SHOW_CREATE_LOADER:
            return {
                ...state,
                isCreateLoading: true
            };
        case HIDE_CREATE_LOADER:
            return {
                ...state,
                isCreateLoading: false
            };
        case SET_CREATE_ERROR:
            return {
                ...state,
                isError: true,
                errorMessage: payload
            };
        case CLEAR_CREATE_ERROR:
            return {
                ...state,
                isError: false
            };


        case SHOW_DELETE_LOADER:
            return {
                ...state,
                isCreateLoading: true
            };
        case HIDE_DELETE_LOADER:
            return {
                ...state,
                isCreateLoading: false
            };
        case SET_DELETE_ERROR:
            return {
                ...state,
                isError: true,
                errorMessage: payload
            };
        case CLEAR_DELETE_ERROR:
            return {
                ...state,
                isError: false
            };


        case CHANGE_TASK_STATUS:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === payload.id ? payload : task)
            };
        default:
            return state;
    }
};

export default tasksReducer;