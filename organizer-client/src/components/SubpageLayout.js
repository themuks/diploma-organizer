import React from "react";

const SubpageLayout = ({ children }) => {
    return (<div className="flex flex-col gap-4 flex-grow max-w-full">
        {children}
    </div>);
};

export default SubpageLayout;