import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

function ProfilePage() {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isError, setIsError] = useState(false);
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        console.log(user);
        reset(user);
    }, [reset, user]);

    // const onSubmit = task => {
    //     setIsError(false);
    //     setIsSaving(true);
    //     task.dueTime = task.dueTime ? new Date(Date.parse(task.dueTime)).toISOString() : null;
    //     UserService.update(id, task).then(() => {
    //     }, () => {
    //         setIsError(() => true);
    //     }).finally(() => {
    //         setIsSaving(() => false);
    //         // dispatch(actions.fetchTasks());
    //     });
    // };
    //
    // useEffect(() => {
    //     setIsError(false);
    //     setIsLoading(true);
    //     TasksService.getById(id).then((response) => {
    //         const task = response.data;
    //         task.dueTime = task.dueTime?.split("T")[0];
    //         reset(task);
    //     }, () => {
    //         setIsError(true);
    //     }).finally(() => {
    //         setIsLoading(false);
    //     });
    // }, [id, reset]);

    return (<Modal>
        {/*<ProfileForm*/}
        {/*    onSubmit={handleSubmit(onSubmit)} isLoading={isTaskCreateLoading} register={register}*/}
        {/*    errors={errors}/>*/}
    </Modal>);
}

export default ProfilePage;