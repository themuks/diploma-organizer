import React from "react";
import { Link } from "react-router-dom";
import Note from "./Note";

const NoteList = ({ notes }) => {
    return (<ul className="flex flex-col divide-y">
        {notes.map(note =>
            <Link key={note.id} to={`${note.id}`}>
                <Note note={note}/>
            </Link>
        )}
    </ul>);
};

export default NoteList;