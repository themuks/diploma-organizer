import { FETCH_USER, LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS } from "./types";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

export const register = ({ email, password }) => (dispatch) => {
    return AuthService.register(email, password).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS
            });
            return Promise.resolve();
        },
        (error) => {
            return Promise.reject();
        }
    );
};

export const login = ({ email, password }, onSuccessCallback) => (dispatch) => {
    return AuthService.login(email, password).then(
        (response) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: response }
            });
            return UserService.getCurrentUser();
        },
        (error) => {
            return Promise.reject();
        }
    ).then((response) => {
            dispatch({
                type: FETCH_USER,
                payload: response.data
            });
            onSuccessCallback();
            return Promise.resolve();
        },
        (error) => {
            return Promise.reject();
        });
};

export const logout = () => (dispatch) => {
    return AuthService.logout().then((data) => {
            dispatch({
                type: LOGOUT
            });
            return Promise.resolve();
        },
        (error) => {
            return Promise.reject();
        });
};

export const fetchUser = () => (dispatch) => {
    return UserService.getCurrentUser().then((response) => {
        dispatch({
            type: FETCH_USER,
            payload: response.data
        });

        return Promise.resolve();
    }, (error) => {
        return Promise.reject();
    });
};