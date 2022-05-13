import React, { useEffect } from "react";
import Modal from "../components/Modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import SettingsForm from "../components/settings/SettingsForm";

function SettingsPage() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const settings = useSelector(state => state.user.settings);

    useEffect(() => {
        reset(settings);
    }, [reset, settings]);

    const onSubmit = settings => {
        // dispatch(actions.createTask(settings));
    };


    return (<Modal>
        <SettingsForm
            onSubmit={handleSubmit(onSubmit)} isLoading={false} register={register}
            errors={errors}/>
    </Modal>);
}

export default SettingsPage;
