import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import WelcomePage from "./pages/welcome/WelcomePage";
import HomePage from "./pages/app/ApplicationPage";
import DashboardPage from "./pages/app/DashboardPage";
import TasksPage from "./pages/app/tasks/TasksPage";
import RemindersPage from "./pages/app/RemindersPage";
import NotesPage from "./pages/app/notes/NotesPage";
import NoteDetailsPage from "./pages/app/notes/NoteDetailsPage";
import CalendarPage from "./pages/app/CalendarPage";
import StatisticsPage from "./pages/app/StatisticsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import NoteCreatePage from "./pages/app/notes/NoteCreatePage";
import TaskCreatePage from "./pages/app/tasks/TaskCreatePage";
import TaskDetailsPage from "./pages/app/tasks/TaskDetailsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
    let location = useLocation();

    let state = location.state;

    return (<>
            {state?.backgroundLocation && (
                <Routes>
                    <Route path="/tasks/:id" element={<TaskDetailsPage/>}/>
                    <Route path="/tasks/new" element={<TaskCreatePage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/settings" element={<SettingsPage/>}/>
                </Routes>
            )}
            <Routes location={state?.backgroundLocation || location}>
                <Route path="/" element={<MainPage/>}>
                    <Route path="welcome" element={<WelcomePage/>}/>
                    <Route element={<HomePage/>}>
                        <Route path="dashboard" element={<DashboardPage/>}/>
                        <Route path="tasks" element={<TasksPage/>}/>
                        <Route path="reminders" element={<RemindersPage/>}/>
                        <Route path="notes" element={<NotesPage/>}/>
                        <Route path="notes/:id" element={<NoteDetailsPage/>}/>
                        <Route path="notes/new" element={<NoteCreatePage/>}/>
                        <Route path="calendar" element={<CalendarPage/>}/>
                        <Route path="statistics" element={<StatisticsPage/>}/>
                        <Route path="*" element={<Navigate to="dashboard"/>}/>
                    </Route>
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
        </>
    );
}

function mapStateToProps(state) {
    const { user } = state.user;
    return {
        user
    };
}

export default connect(mapStateToProps)(App);