import React from "react";

const Reminder = ({ reminder }) => {
    return (
        <li className="flex items-center gap-4 w-full relative box-border p-4 hover:bg-gray-100 dark:hover:bg-gray-800">
            <p className="text-lg font-medium dark:text-gray-300">{reminder.title}</p>
        </li>
    );
};

export default Reminder;