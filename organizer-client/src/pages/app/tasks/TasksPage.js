import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Alert from "../../../components/Alert";
import Spinner from "../../../components/Spinner";
import TaskList from "../../../components/tasks/TaskList";
import NoData from "../../../components/NoData";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/tasks/actions";
import { getTasks, getViewState, isCreateLoading, ViewState } from "../../../redux/tasks/selectors";
import TaskFastForm from "../../../components/tasks/TaskFastForm";
import { useForm } from "react-hook-form";
import Card from "../../../components/Card";

const TasksPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const viewState = useSelector(getViewState);
    const isTaskCreateLoading = useSelector(isCreateLoading);
    const tasks = useSelector(getTasks);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = task => {
        dispatch(actions.createTask(task));
        reset();
    };

    const onChangeTaskStatus = (task) => (event) => {
        event.stopPropagation();
        event.preventDefault();
        const newTask = { ...task, taskStatus: task.taskStatus === "TO_DO" ? "DONE" : "TO_DO" };
        dispatch(actions.changeTaskStatus(newTask));
    };

    const onTaskDelete = (task) => (event) => {
        event.stopPropagation();
        event.preventDefault();
        dispatch(actions.deleteTask(task));
    };

    useEffect(() => {
        dispatch(actions.fetchTasks());
    }, [location, dispatch]);

    switch (viewState) {
        case ViewState.LOADING:
            return <Spinner/>;
        case ViewState.ERROR:
            return <Alert/>;
        case ViewState.NO_DATA:
            return <NoData/>;
        default:
            return <Card>
                <TaskFastForm
                    onSubmit={handleSubmit(onSubmit)} isLoading={isTaskCreateLoading} register={register}
                    errors={errors}/>
                <TaskList tasks={tasks} onChangeTaskStatus={onChangeTaskStatus} onTaskDelete={onTaskDelete}/>
            </Card>;
    }
};

export default TasksPage;