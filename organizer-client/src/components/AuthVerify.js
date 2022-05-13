import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

const AuthVerify = ({ logout }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname.startsWith("/app")) {
            const user = JSON.parse(localStorage.getItem("user"));
            console.log(user)
            if (user) {
                const decodedJwt = parseJwt(user.accessToken);
                if (decodedJwt.exp * 1000 < Date.now()) {
                    logout();
                }
            } else {
                navigate("/login");
            }
        }
    }, [location, logout, navigate]);

    return <></>;
};

export default AuthVerify;