import React, { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import { useTranslation } from "react-i18next";
import Card from "../../components/Card";

const StatisticsPage = () => {
    const { t } = useTranslation();
    const [statistics, setStatistics] = useState({});

    useEffect(() => {
        UserService.getCurrentUserStatistics().then((response) => {
            setStatistics(() => response.data);
        });
    }, []);

    return (
        <Card>
            <div className="grid grid-cols-2 gap-4 m-4 dark:text-gray-300">
                <span>{t("TotalTasksCreated", { value: statistics.totalTasksCreated })}</span>
                <span>{t("TotalNotesCreated", { value: statistics.totalNotesCreated })}</span>
                <span>{t("TotalRemindersCreated", { value: statistics.totalRemindersCreated })}</span>
                <span>{t("TasksCreatedLastWeek", { value: statistics.tasksCreatedLastWeek })}</span>
                <span>{t("TasksCompletedLastWeek", { value: statistics.tasksCompletedLastWeek })}</span>
                <span>{t("TasksCompletedComparedWithPreviousWeek", { value: statistics.tasksCompletedComparedWithPreviousWeek })}</span>
                <span>{t("WorkingHoursPending", { value: statistics.workingHoursPending })}</span>
            </div>
        </Card>
    );
};

export default StatisticsPage;