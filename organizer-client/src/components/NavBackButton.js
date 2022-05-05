import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavBackButton = ({ ...other }) => {
    const navigate = useNavigate();
    return (<button
            type="button"
            className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
            onClick={() => navigate(-1)}
            {...other}
        >
            <FaArrowLeft className="w-5 h-5"/>
        </button>
    );
};

export default NavBackButton;