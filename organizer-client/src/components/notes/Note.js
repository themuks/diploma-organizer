import React from "react";

const Note = ({ note }) => {
    return (<li className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800">
        <p className="text-lg font-medium dark:text-gray-300">{note.title}</p>
        <div
            className="max-w-full font-normal dark:text-gray-300 overflow-hidden whitespace-nowrap overflow-ellipsis">{note.text}</div>
    </li>);
};

export default Note;