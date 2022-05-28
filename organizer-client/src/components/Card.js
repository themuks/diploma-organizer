import React from "react";

const Card = ({ children, className }) => {
    return (
        <div className={`${className} flex flex-col rounded-lg shadow w-100 overflow-hidden dark:border-gray-700 dark:border-1 dark:border`}>
            {children}
        </div>
    );
};

export default Card;