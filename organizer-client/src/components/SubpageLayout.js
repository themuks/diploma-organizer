import React from "react";

const SubpageLayout = ({ children }) => {
    return (<div className="m-4 flex flex-col gap-4 flex-grow max-w-full">
        {children}
    </div>);
};

export default SubpageLayout;