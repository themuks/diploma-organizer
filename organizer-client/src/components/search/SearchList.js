import React from "react";
import NoData from "../NoData";
import { Link, useLocation } from "react-router-dom";

const SearchList = ({ results }) => {
    const location = useLocation();

    if (results.length === 0) return <NoData/>; else return <ul className="flex flex-col divide-y dark:divide-gray-700 min-w-max">
        {results.map(result => <Link
            to={result.text !== undefined ? `/app/notes/${result.id}` : result.startTime !== undefined ? `/app/tasks/${result.id}` : `/app/reminders/${result.id}`}
            state={result.startTime !== undefined ? { backgroundLocation: location } : undefined}>
            <li
                className="flex flex-col gap-4 w-full relative box-border p-4 hover:bg-gray-100 ">
                <span className="dark:text-gray-300">{result.title}</span>
                <span className="dark:text-gray-300 text-sm">{result.text !== undefined ? result.text : result.description}</span>
            </li>
        </Link>)}
    </ul>;
};

export default SearchList;