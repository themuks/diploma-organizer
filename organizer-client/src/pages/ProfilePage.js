import React, { useEffect } from "react";
import Modal from "../components/Modal";
import ProfileForm from "../components/profile/ProfileForm";
import { useForm } from "react-hook-form";
import * as actions from "../redux/tasks/actions";
import { useDispatch, useSelector } from "react-redux";
import { isCreateLoading } from "../redux/tasks/selectors";

function ProfilePage() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const isTaskCreateLoading = useSelector(isCreateLoading);
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        console.log(user)
        reset(user);
    }, [reset, user]);

    const onSubmit = task => {
        dispatch(actions.createTask(task));
        reset();
    };

    return (<Modal>
        <ProfileForm
            onSubmit={handleSubmit(onSubmit)} isLoading={isTaskCreateLoading} register={register}
            errors={errors}/>
    </Modal>);
}

export default ProfilePage;
