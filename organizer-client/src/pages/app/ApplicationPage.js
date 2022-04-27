import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";

function ApplicationPage() {
    return (<div className="flex h-full">
        <SideBar/>
        <Outlet/>
    </div>);
}

export default ApplicationPage;
