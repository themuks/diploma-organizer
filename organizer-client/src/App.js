import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import WelcomePage from "./pages/welcome/WelcomePage";
import ApplicationPage from "./pages/app/ApplicationPage";
import DashboardPage from "./pages/app/DashboardPage";
import TasksPage from "./pages/app/tasks/TasksPage";
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
import RemindersPage from "./pages/app/reminders/RemindersPage";
import SignOutPage from "./pages/SignOutPage";
import AuthVerify from "./components/AuthVerify";
import * as actions from "./redux/user/actions";


function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    let state = location.state;

    const logout = () => {
        dispatch(actions.logout());
    };

    return (<>
            {state?.backgroundLocation && (
                <Routes>
                    <Route path="/app/tasks/:id" element={<TaskDetailsPage/>}/>
                    <Route path="/app/tasks/new" element={<TaskCreatePage/>}/>
                    <Route path="/app/profile" element={<ProfilePage/>}/>
                    <Route path="/app/settings" element={<SettingsPage/>}/>
                    <Route path="/logout" element={<SignOutPage/>}/>
                </Routes>
            )}
            <Routes location={state?.backgroundLocation || location}>
                <Route path="/" element={<MainPage/>}>
                    <Route path="welcome" element={<WelcomePage/>}/>
                    <Route path="app" element={<ApplicationPage/>}>
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
                    <Route path="*" element={<Navigate to="/app/dashboard" replace={true}/>}/>
                </Route>
                <Route
                    path="*"
                    element={<main className="p-4">
                        <p>Тут ничего нет!</p>
                        <Link to="/">Вернуться на домашнюю страницу</Link>
                    </main>}
                />
            </Routes>
            <AuthVerify logOut={logout}/>
        </>
    );
}

export default App;