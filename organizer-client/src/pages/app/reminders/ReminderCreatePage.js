import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReminderForm from "../../../components/reminders/ReminderForm";
import { getViewState, ViewState } from "../../../redux/reminders/selectors";
import * as actions from "../../../redux/reminders/actions";

const ReminderCreatePage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = reminder => {
        dispatch(actions.createReminder(reminder));
        navigate(-1);
    };

    const dispatch = useDispatch();
    const viewState = useSelector(getViewState);

    switch (viewState) {
        case ViewState.LOADING:
            return (<ReminderForm
                isNew={true}
                isLoading={true}
                onSubmit={handleSubmit(onSubmit)} register={register} errors={errors}/>);
        default:
            return (<ReminderForm
                isNew={true}
                onSubmit={handleSubmit(onSubmit)} register={register} errors={errors}/>);
    }
};

export default ReminderCreatePage;