import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";

function ApplicationPage() {
    return (<div className="flex flex-col">
        <SideBar/>
        <Outlet/>
    </div>);
}

export default ApplicationPage;
