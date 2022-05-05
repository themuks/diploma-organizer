import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import notesReducer from "./notes/reducers";
import userReducer from "./reducers/auth";
import messageReducer from "./reducers/message";
import tasksReducer from "./tasks/reducers";

const middleware = [thunk];
const enhancers = [];
const reducers = {
    tasks: tasksReducer,
    notes: notesReducer,
    user: userReducer,
    message: messageReducer
};

export default function configureStore(initialState) {
    return createStore(
        combineReducers(reducers),
        initialState,
        composeWithDevTools(applyMiddleware(...middleware), ...enhancers)
    );
}