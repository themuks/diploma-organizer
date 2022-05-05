import {
    CHANGE_TASK_STATUS,
    CLEAR_CREATE_ERROR,
    CLEAR_DELETE_ERROR,
    CLEAR_ERROR,
    CREATE_TASK,
    DELETE_TASK,
    FETCH_TASKS,
    HIDE_CREATE_LOADER,
    HIDE_DELETE_LOADER,
    HIDE_LOADER,
    SET_CREATE_ERROR,
    SET_DELETE_ERROR,
    SET_ERROR,
    SHOW_CREATE_LOADER,
    SHOW_DELETE_LOADER,
    SHOW_LOADER,
    UPDATE_TASK
} from "./types";
import TasksService from "../../services/tasks.service";

export const fetchTasks = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
    dispatch({
        type: SHOW_LOADER
    });

    return TasksService.getAll().then(
        response => {
            dispatch({
                type: FETCH_TASKS,
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

export const changeTaskStatus = (task) => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
    dispatch({
        type: SHOW_LOADER
    });
    dispatch({
        type: CHANGE_TASK_STATUS,
        payload: task
    });

    return TasksService.update(task.id, task).then(
        response => {
            dispatch({
                type: UPDATE_TASK,
                payload: response.data
            });

            return TasksService.getAll().then(
                response => {
                    dispatch({
                        type: FETCH_TASKS,
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
        });
};

export const createTask = (task) => (dispatch) => {
    dispatch({
        type: CLEAR_CREATE_ERROR
    });
    dispatch({
        type: SHOW_CREATE_LOADER
    });

    return TasksService.create(task).then(
        response => {
            dispatch({
                type: CREATE_TASK,
                payload: response.data
            });

            return Promise.resolve();
        },
        error => {
            dispatch({
                type: SET_CREATE_ERROR,
                payload: error.message
            });
        })
        .finally(() => {
            dispatch({
                type: HIDE_CREATE_LOADER
            });
        });
};

export const deleteTask = (task) => (dispatch) => {
    dispatch({
        type: CLEAR_DELETE_ERROR
    });
    dispatch({
        type: SHOW_DELETE_LOADER
    });

    return TasksService.delete(task.id).then(
        response => {
            dispatch({
                type: DELETE_TASK,
                payload: response.data
            });

            return Promise.resolve();
        },
        error => {
            dispatch({
                type: SET_DELETE_ERROR,
                payload: error.message
            });
        })
        .finally(() => {
            dispatch({
                type: HIDE_DELETE_LOADER
            });
        });
};