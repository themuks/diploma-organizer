import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/reminders/actions";
import { getReminder, getViewState, ViewState } from "../../../redux/reminders/selectors";
import ReminderForm from "../../../components/reminders/ReminderForm";
import Alert from "../../../components/Alert";

const ReminderDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = reminder => {
        dispatch(actions.updateReminder(id, reminder));
    };
    const onDelete = () => {
        dispatch(actions.deleteReminder(id));
        navigate(-1);
    };

    const dispatch = useDispatch();
    const viewState = useSelector(getViewState);
    const reminder = useSelector(getReminder);

    useEffect(() => {
        dispatch(actions.getReminder(id));
    }, [dispatch, id]);

    useEffect(() => {
        console.log("REMINDER", reminder);
        reset(reminder);
    }, [id, reminder, reset]);

    switch (viewState) {
        case ViewState.LOADING:
            return <ReminderForm
                isLoading={true}
                onDelete={onDelete}
                onSubmit={handleSubmit(onSubmit)} register={register} errors={errors}/>;
        case ViewState.ERROR:
            return <Alert/>;
        default:
            return <ReminderForm
                onDelete={onDelete}
                onSubmit={handleSubmit(onSubmit)} register={register} errors={errors}/>;
    }
};

export default ReminderDetailsPage;