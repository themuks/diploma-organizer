import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../../components/Alert";
import TasksService from "../../../services/tasks.service";
import TaskForm from "../../../components/tasks/TaskForm";
import Spinner from "../../../components/Spinner";
import Modal from "../../../components/Modal";
import * as actions from "../../../redux/tasks/actions";
import { useDispatch } from "react-redux";

const TaskDetailsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isError, setIsError] = useState(false);

    const onSubmit = task => {
        setIsError(false);
        setIsSaving(true);
        task.dueTime = task.dueTime ? new Date(Date.parse(task.dueTime)).toISOString() : null;
        TasksService.update(id, task).then(() => {
        }, () => {
            setIsError(() => true);
        }).finally(() => {
            setIsSaving(() => false);
            // dispatch(actions.fetchTasks());
        });
    };
    const onDelete = () => {
        setIsError(false);
        setIsDeleting(true);
        TasksService.delete(id).then(() => {
        }, () => {
            setIsError(true);
        }).finally(() => {
            setIsDeleting(false);
            // dispatch(actions.fetchTasks());
            navigate("/tasks");
        });
    };

    useEffect(() => {
        setIsError(false);
        setIsLoading(true);
        TasksService.getById(id).then((response) => {
            const task = response.data;
            task.dueTime = task.dueTime?.split("T")[0];
            reset(task);
        }, () => {
            setIsError(true);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [id, reset]);

    if (isError) {
        return <Modal><Alert/></Modal>;
    } else if (isLoading) {
        return <Modal><Spinner/></Modal>;
    } else if (isSaving || isDeleting) {
        return <Modal><TaskForm
            isLoading={isSaving}
            isDeleting={isDeleting}
            onDelete={onDelete}
            onSubmit={handleSubmit(onSubmit)} register={register} errors={errors}/></Modal>;
    } else {
        return <Modal><TaskForm
            onDelete={onDelete}
            onSubmit={handleSubmit(onSubmit)} register={register} errors={errors}/></Modal>;
    }
};

export default TaskDetailsPage;