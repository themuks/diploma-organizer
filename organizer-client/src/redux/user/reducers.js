import { FETCH_USER, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS } from "./types";

const user = JSON.parse(localStorage.getItem("user"));
const userEmail = JSON.parse(localStorage.getItem("userEmail"));
const initialState = user
    ? { isLoggedIn: true, user, userInfo: { email: userEmail } }
    : { isLoggedIn: false, user: null, userInfo: null };

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: false
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: payload.user
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        case FETCH_USER:
            return {
                ...state,
                userInfo: { ...state.userInfo, ...payload }
            };
        default:
            return state;
    }
};

export default userReducer;
