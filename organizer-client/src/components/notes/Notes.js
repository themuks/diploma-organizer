import React from "react";
import { Link } from "react-router-dom";
import Note from "./Note";

const Notes = ({ notes }) => {
    return (<ul className="flex flex-col gap-4">
        {notes.map(note =>
            <Link to={`${note.id}`}>
                <Note key={note.id} note={note}/>
            </Link>
        )}
    </ul>);
};

export default Notes;