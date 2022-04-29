import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const MainPage = () => {
    return (<div className="flex flex-col justify-between h-screen">
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>);
};

export default MainPage;