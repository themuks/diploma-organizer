import React from "react";

const Card = ({ children, className }) => {
    return (
        <div className={`${className} flex flex-col rounded-lg shadow w-100 overflow-hidden`}>
            {children}
        </div>
    );
};

export default Card;