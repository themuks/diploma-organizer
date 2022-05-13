import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const MainPage = () => {
    return (<div className="flex flex-col justify-between h-screen dark:bg-gray-900">
        <NavBar/>
        <main className="flex flex-col gap-4 flex-grow max-w-full">
            <Outlet/>
        </main>
        <Footer/>
    </div>);
};

export default MainPage;