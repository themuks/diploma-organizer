import RemindersService from "../../services/reminders.service";
import {
    CLEAR_ERROR,
    CREATE_REMINDER,
    FETCH_REMINDER,
    FETCH_REMINDERS,
    HIDE_LOADER,
    SET_ERROR,
    SHOW_LOADER
} from "./types";

export const createReminder = (reminder) => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
    dispatch({
        type: SHOW_LOADER
    });

    return RemindersService.create(reminder).then(
        response => {
            dispatch({
                type: CREATE_REMINDER,
                payload: response.data
            });

            return Promise.resolve();
        },
        error => {
            dispatch({
                type: SET_ERROR,
                payload: error.message
            });
        })
        .finally(() => {
            dispatch({
                type: HIDE_LOADER
            });
        });
};

export const deleteReminder = (id) => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
    dispatch({
        type: SHOW_LOADER
    });

    return RemindersService.delete(id).then(
        response => Promise.resolve(),
        error => {
            dispatch({
                type: SET_ERROR,
                payload: error.message
            });
        })
        .finally(() => {
            dispatch({
                type: HIDE_LOADER
            });
        });
};

export const updateReminder = (id, reminder) => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
    dispatch({
        type: SHOW_LOADER
    });

    return RemindersService.update(id, reminder).then(
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

export const getReminder = (id) => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
    dispatch({
        type: SHOW_LOADER
    });

    return RemindersService.getById(id).then(
        response => {
            dispatch({
                type: FETCH_REMINDER,
                payload: response.data
            });

            return Promise.resolve();
        },
        error => {
            dispatch({
                type: SET_ERROR,
                payload: error.message
            });
        })
        .finally(() => {
            dispatch({
                type: HIDE_LOADER
            });
        });
};

export const getReminders = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
    dispatch({
        type: SHOW_LOADER
    });

    return RemindersService.getAll().then(
        response => {
            dispatch({
                type: FETCH_REMINDERS,
                payload: response.data
            });

            return Promise.resolve();
        },
        error => {
            dispatch({
                type: SET_ERROR,
                payload: error.message
            });
        })
        .finally(() => {
            dispatch({
                type: HIDE_LOADER
            });
        });
};