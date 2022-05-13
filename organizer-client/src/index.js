import React from "react";
import ReactDOM from "react-dom";
import "flowbite";
import "./index.scss";
import "./i18n/i18n";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const store = configureStore();
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

ReactDOM.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </QueryClientProvider>
    </Provider>,
    document.getElementById("root")
);
