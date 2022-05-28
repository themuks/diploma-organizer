import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import notesReducer from "./notes/reducers";
import userReducer from "./user/reducers";
import tasksReducer from "./tasks/reducers";
import remindersReducer from "./reminders/reducers";

const middleware = [thunk];
const enhancers = [];
const reducers = {
    tasks: tasksReducer,
    notes: notesReducer,
    reminders: remindersReducer,
    user: userReducer
};

export default function configureStore(initialState) {
    return createStore(
        combineReducers(reducers),
        initialState,
        composeWithDevTools(applyMiddleware(...middleware), ...enhancers)
    );
}