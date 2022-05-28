import React, { useEffect, useState } from "react";
import UpcomingTaskList from "../../components/dashboard/UpcomingTaskList";
import Card from "../../components/Card";
import UpcomingReminderList from "../../components/dashboard/UpcomingReminderList";
import { useTranslation } from "react-i18next";
import { getUser } from "../../redux/user/selectors";
import { useSelector } from "react-redux";
import RecommendationList from "../../components/recomendations/RecomendationList";
import moment from "moment";
import UserService from "../../services/user.service";
import RemindersService from "../../services/reminders.service";
import TasksService from "../../services/tasks.service";

const DashboardPage = () => {
    const { t, i18n } = useTranslation();
    const user = useSelector(getUser);
    const [dateTime, setDateTime] = useState(moment().format("LLL"));
    const [recommendations, setRecommendations] = useState([]);
    const [reminders, setReminders] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(() => moment().format("LLL"));
        }, 1000);

        UserService.getCurrentUserRecommendations().then((response) => {
            setRecommendations(() => {
                return response.data.map(e => {
                    switch (e.recommendationCode) {
                        case ("11"):
                            e.title = t("Recommendation11");
                            e.priority = "LOW";
                            break;
                        case ("12"):
                            e.title = t("Recommendation12", { value: e.relatedEntities.length });
                            e.priority = "HIGH";
                            break;
                        case ("13"):
                            e.title = t("Recommendation13", { value: e.relatedEntities.length });
                            e.priority = "MEDIUM";
                            break;
                    }
                    return e;
                });

                setRecommendations(prev => recommendations);
            });
        });

        RemindersService.getAll().then(response => {
            setReminders(prev => response.data.sort((a, b) => moment(a.dateTime, "YYYY-MM-DD").isAfter(b.dateTime)).slice(0, 5));
        });

        TasksService.getAll().then(response => {
            setTasks(prev => response.data.filter(e => e.startTime !== null && e.taskStatus === "TO_DO").sort((a, b) => !moment(a.startTime).isAfter(moment(b.startTime))).slice(0, 5).reverse());
        });

        return () => clearInterval(timer);
    }, []);

    return (<>
        <h1 className="text-xl font-medium text-gray-900 dark:text-gray-300">{t("HelloUser", {
            name: user.name,
            surname: user.surname
        })}</h1>
        <h1 className="text-xl font-medium text-gray-600 dark:text-gray-300">{t("TodayDate", { date: dateTime })}</h1>
        <div className="flex w-full gap-4 flex-wrap">
            <div className="flex flex-1 flex-col gap-4">
                <h2 className="text-l font-medium text-gray-900 dark:text-gray-300">{t("UpcomingTasks")}</h2>
                <Card>
                    <div className="flex flex-col gap-4">
                        <UpcomingTaskList tasks={tasks}/>
                    </div>
                </Card>
                <h2 className="text-l font-medium text-gray-900 dark:text-gray-300">{t("UpcomingReminders")}</h2>
                <Card>
                    <div className="flex flex-col gap-4">
                        <UpcomingReminderList reminders={reminders}/>
                    </div>
                </Card>
            </div>
            <div className="flex flex-col">
                <h2 className="text-l font-medium text-gray-900 dark:text-gray-300">{t("Recommendations")}</h2>
                <Card className="flex">
                    <div className="flex flex-col gap-4">
                        <RecommendationList recommendations={recommendations}/>
                    </div>
                </Card>
            </div>
        </div>
    </>);
};

export default DashboardPage;