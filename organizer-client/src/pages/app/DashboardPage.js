import React, { useEffect, useState } from "react";
import UpcomingTaskList from "../../components/dashboard/UpcomingTaskList";
import Card from "../../components/Card";
import UpcomingReminderList from "../../components/dashboard/UpcomingReminderList";
import { useTranslation } from "react-i18next";
import { getUser } from "../../redux/user/selectors";
import { useSelector } from "react-redux";
import RecommendationList from "../../components/recomendations/RecomendationList";
import moment from "moment";

const DashboardPage = () => {
    const { t, i18n } = useTranslation();
    const user = useSelector(getUser);
    const [dateTime, setDateTime] = useState(moment().format("LLL"));

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(() => moment().format("LLL"));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (<>
        <h1 className="text-xl font-medium text-gray-900 dark:text-white">{t("HelloUser", {
            name: user.name,
            surname: user.surname
        })}</h1>
        <h1 className="text-xl font-medium text-gray-600 dark:text-white">{t("TodayDate", { date: dateTime })}</h1>
        <div className="flex w-full gap-4 flex-wrap">
            <div className="flex flex-1 flex-col gap-4">
                <Card>
                    <div className="flex flex-col gap-4 m-4">
                        <h2 className="text-l font-medium text-gray-900 dark:text-white">{t("UpcomingTasks")}</h2>
                        <UpcomingTaskList/>
                    </div>
                </Card>
                <Card>
                    <div className="flex flex-col gap-4 m-4">
                        <h2 className="text-l font-medium text-gray-900 dark:text-white">{t("UpcomingReminders")}</h2>
                        <UpcomingReminderList/>
                    </div>
                </Card>
            </div>
            <Card className="flex-1">
                <div className="flex flex-col gap-4 m-4">
                    <h2 className="text-l font-medium text-gray-900 dark:text-white">{t("Recommendations")}</h2>
                    <RecommendationList/>
                </div>
            </Card>
        </div>
    </>);
};

export default DashboardPage;