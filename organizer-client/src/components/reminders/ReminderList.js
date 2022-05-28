import React from "react";
import { Link } from "react-router-dom";
import Reminder from "./Reminder";
import NoData from "../NoData";

const ReminderList = ({ reminders }) => {
    return (<ul className="flex flex-col divide-y dark:divide-gray-700">
        {!reminders.length && <NoData/>}
        {reminders.map(reminder =>
            <Link key={reminder.id} to={`${reminder.id}`}>
                <Reminder reminder={reminder}/>
            </Link>
        )}
    </ul>);
};

export default ReminderList;