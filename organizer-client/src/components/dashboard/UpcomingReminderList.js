import React from "react";
import NoData from "../NoData";
import moment from "moment";
import { useTranslation } from "react-i18next";

const UpcomingReminderList = ({ reminders }) => {
    const { t } = useTranslation();

    if (reminders.length === 0) return <NoData/>; else return (<ul className="flex flex-col divide-y dark:divide-gray-700 min-w-max">
        {reminders.map((reminder, index) => <li
            className="flex items-center gap-4 w-full relative box-border p-4 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300">
            <span
                className="text-sm">{moment(reminder.dateTime).isSame(moment()) ? t("Today") : moment().diff(moment(reminder.dateTime), "days") === 0 ? t("Tomorrow") : moment(reminder.dateTime).format("L")}</span>
            <span>{reminder.title}</span>
        </li>)}
    </ul>);
};

export default UpcomingReminderList;