import React from "react";
import RemindersService from "../../../services/reminders.service";
import { useQuery } from "react-query";
import Spinner from "../../../components/Spinner";
import Alert from "../../../components/Alert";
import Card from "../../../components/Card";
import ReminderList from "../../../components/reminders/ReminderList";

const RemindersPage = () => {
    const { isLoading, isError, data } = useQuery("reminders", async () => {
        const response = await RemindersService.getAll();
        return response.data;
    });

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <Alert/>;
    } else {
        return <Card>
            <ReminderList reminders={data}/>
        </Card>;
    }
};

export default RemindersPage;