import React from "react";
import NoData from "../NoData";
import moment from "moment";
import { useTranslation } from "react-i18next";

const UpcomingTaskList = ({ tasks }) => {
    const { t } = useTranslation();

    if (tasks.length === 0) return <NoData/>; else return (<ul className="flex flex-col divide-y dark:divide-gray-700 min-w-max">
        {tasks.map((task, index) => <li
            className="flex items-center gap-4 w-full relative box-border p-4 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300">
            <span
                className="text-sm">{moment().diff(moment(task.startTime), "days") === 0 ? t("Today") : moment().diff(moment(task.startTime), "days") === 1 ? t("Tomorrow") : moment(task.startTime).format("L")}</span>
            <span>{task.title}</span>
        </li>)}
    </ul>);
};

export default UpcomingTaskList;