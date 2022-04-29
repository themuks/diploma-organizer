import React from "react";
import ReactDOM from "react-dom";
import "flowbite";
import "./index.css";
import "./i18n/i18n";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./redux";

const i18nextConfig = {
    language: null,
    whitelist: [ "en", "ru" ],
    ns: [ "common" ],
    defaultNS: "common"
};

const store = configureStore({
    i18next: i18nextConfig
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);
