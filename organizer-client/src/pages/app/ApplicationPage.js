import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";
import SubpageLayout from "../../components/SubpageLayout";

function ApplicationPage() {
    return (<div className="flex mb-auto justify-start w-full dark:bg-gray-900">
            <SideBar/>
            <SubpageLayout>
                <Outlet/>
            </SubpageLayout>
        </div>
    );
}

export default ApplicationPage;
