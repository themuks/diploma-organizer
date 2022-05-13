import React from "react";
import { Link, useLocation } from "react-router-dom";
import Reminder from "./Reminder";

const ReminderList = ({ reminders }) => {
    const location = useLocation();

    return (<ul className="flex flex-col divide-y">
        {reminders.map(reminder =>
            <Link
                className="box-border" key={reminder.id} to={`${reminder.id}`} state={{ backgroundLocation: location }}>
                <Reminder reminder={reminder}/>
            </Link>
        )}
    </ul>);
};

export default ReminderList;