import React from "react";

const Card = ({ children }) => {
    return (
        <div className="rounded-lg shadow w-80">
            {children}
        </div>
    );
};

export default Card;