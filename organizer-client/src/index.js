import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./i18n";
import App from "./App";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MainPage from "./pages/app/ApplicationPage";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signUp/SignUpPage";
import ProfilePage from "./pages/profile/ProfilePage";
import WelcomePage from "./pages/welcome/WelcomePage";
import TasksPage from "./pages/app/TasksPage";
import { Provider } from "react-redux";
import store from "./store";
import DashboardPage from "./pages/app/DashboardPage";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route path="welcome" element={<WelcomePage/>}/>
                    <Route path="app" element={<MainPage/>}>
                        <Route path="dashboard" element={<DashboardPage/>}/>
                        <Route path="tasks" element={<TasksPage/>}/>
                        {/*<Route path="reminders" element={<RemindersPage/>}/>*/}
                        {/*<Route path="tasks" element={<TasksPage/>}/>*/}
                        {/*<Route path="tasks" element={<TasksPage/>}/>*/}
                        {/*<Route path="tasks" element={<TasksPage/>}/>*/}
                        {/*<Route path="tasks" element={<TasksPage/>}/>*/}
                        {/*<Route path="tasks" element={<TasksPage/>}/>*/}
                    </Route>
                    <Route path="profile" element={<ProfilePage/>}/>
                    {/*<Route path='plans' element={<Plans/>}/>*/}
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="signUp" element={<SignUpPage/>}/>
                </Route>
                <Route
                    path="*"
                    element={<main className="p-4">
                        <p>Тут ничего нет!</p>
                        <Link to="/home">Вернуться на домашнюю страницу</Link>
                    </main>}
                />
            </Routes>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
