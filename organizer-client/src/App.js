import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import WelcomePage from "./pages/welcome/WelcomePage";
import HomePage from "./pages/app/ApplicationPage";
import DashboardPage from "./pages/app/DashboardPage";
import TasksPage from "./pages/app/TasksPage";
import RemindersPage from "./pages/app/RemindersPage";
import NotesPage from "./pages/app/notes/NotesPage";
import NoteDetailsPage from "./pages/app/notes/NoteDetailsPage";
import CalendarPage from "./pages/app/CalendarPage";
import StatisticsPage from "./pages/app/StatisticsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signUp/SignUpPage";
import MainPage from "./pages/MainPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}>
                    <Route path="welcome" element={<WelcomePage/>}/>
                    <Route path="app" element={<HomePage/>}>
                        <Route path="dashboard" element={<DashboardPage/>}/>
                        <Route path="tasks" element={<TasksPage/>}/>
                        <Route path="reminders" element={<RemindersPage/>}/>
                        <Route path="notes" element={<NotesPage/>}/>
                        <Route path="notes/:id" element={<NoteDetailsPage/>}/>
                        <Route path="calendar" element={<CalendarPage/>}/>
                        <Route path="statistics" element={<StatisticsPage/>}/>
                        <Route path="*" element={<Navigate to="dashboard"/>}/>
                    </Route>
                    <Route path="profile" element={<ProfilePage/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="signUp" element={<SignUpPage/>}/>
                    <Route path="*" element={<Navigate to="/app"/>}/>
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
    );
}

function mapStateToProps(state) {
    const { user } = state.user;
    return {
        user
    };
}

export default connect(mapStateToProps)(App);