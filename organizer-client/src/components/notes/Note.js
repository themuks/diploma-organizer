import React from "react";

const Note = ({ note }) => {
    return (<li className="p-4">
        <p className="text-lg font-medium dark:text-white">{note.title}</p>
        <div
            className="max-w-full font-normal dark:text-white overflow-hidden whitespace-nowrap overflow-ellipsis">{note.text}</div>
    </li>);
};

export default Note;