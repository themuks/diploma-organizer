import React, { useEffect } from "react";
import Spinner from "../../../components/Spinner";
import Alert from "../../../components/Alert";
import Card from "../../../components/Card";
import ReminderList from "../../../components/reminders/ReminderList";
import { Link } from "react-router-dom";
import Button from "../../../components/form/Button";
import { useTranslation } from "react-i18next";
import * as actions from "../../../redux/reminders/actions";
import { getReminders, getViewState, ViewState } from "../../../redux/reminders/selectors";
import NoData from "../../../components/NoData";
import { useDispatch, useSelector } from "react-redux";

const RemindersPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const viewState = useSelector(getViewState);
    const reminders = useSelector(getReminders);

    useEffect(() => {
        dispatch(actions.getReminders());
    }, [dispatch]);

    switch (viewState) {
        case ViewState.LOADING:
            return <Spinner/>;
        case ViewState.ERROR:
            return <Alert/>;
        case ViewState.NO_DATA:
            return <Card>
                <div className="flex p-4">
                    <Link to="new">
                        <Button text={t("CreateReminder")}/>
                    </Link>
                </div>
                <NoData/>
            </Card>;
        default:
            return <Card>
                <div className="flex p-4">
                    <Link to="new">
                        <Button text={t("CreateReminder")}/>
                    </Link>
                </div>
                <ReminderList reminders={reminders}/>
            </Card>;
    }
};

export default RemindersPage;