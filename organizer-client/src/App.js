import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { connect } from "react-redux";

function App() {
    return (<div className="flex flex-col justify-between h-screen">
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>);
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(App);