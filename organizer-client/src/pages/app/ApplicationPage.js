import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import SubpageLayout from "../../components/SubpageLayout";

function ApplicationPage() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
            if (location.pathname === "/app") {
                navigate("dashboard", { replace: true });
            }
        }
    );

    return (<div className="flex h-full">
            <SideBar/>
            <SubpageLayout>
                <Outlet/>
            </SubpageLayout>
        </div>
    );
}

export default ApplicationPage;
