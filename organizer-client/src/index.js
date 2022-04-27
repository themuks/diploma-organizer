import React from "react";
import ReactDOM from "react-dom";
import "flowbite";
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
import RemindersPage from "./pages/app/RemindersPage";
import CalendarPage from "./pages/app/CalendarPage";
import NotesPage from "./pages/app/NotesPage";
import StatisticsPage from "./pages/app/StatisticsPage";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route path="welcome" element={<WelcomePage/>}/>
                    <Route path="app" element={<MainPage/>}>
                        <Route path="dashboard" element={<DashboardPage/>}/>
                        <Route path="tasks" element={<TasksPage/>}/>
                        <Route path="reminders" element={<RemindersPage/>}/>
                        <Route path="notes" element={<NotesPage/>}/>
                        <Route path="calendar" element={<CalendarPage/>}/>
                        <Route path="statistics" element={<StatisticsPage/>}/>
                        <Route path="tasks" element={<TasksPage/>}/>
                        <Route path="tasks" element={<TasksPage/>}/>
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
                        <Link to="/">Вернуться на домашнюю страницу</Link>
                    </main>}
                />
            </Routes>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
