import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TasksService from "../../../services/tasks.service";
import Alert from "../../../components/Alert";
import TaskForm from "../../../components/tasks/TaskForm";
import Modal from "../../../components/Modal";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/tasks/actions";

const TaskCreatePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const onSubmit = task => {
        setIsError(false);
        setIsLoading(true);
        task.dueTime = task.dueTime ? new Date(Date.parse(task.dueTime)).toISOString() : null;
        TasksService.create(task).then(() => {
        }, () => {
            setIsError(() => true);
        }).finally(() => {
            setIsLoading(() => false);
            // dispatch(actions.fetchTasks());
            navigate("tasks");
        });
    };

    if (isError) {
        return <Modal><Alert/></Modal>;
    } else if (isLoading) {
        return (<Modal><TaskForm
            isNew={true}
            isLoading={true}
            onSubmit={handleSubmit(onSubmit)} register={register} errors={errors}/></Modal>);
    } else {
        return (<Modal><TaskForm
            isNew={true}
            onSubmit={handleSubmit(onSubmit)} register={register} errors={errors}/></Modal>);
    }
};

export default TaskCreatePage;