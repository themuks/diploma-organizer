import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Alert from "../../../components/Alert";
import Spinner from "../../../components/Spinner";
import TaskList from "../../../components/tasks/TaskList";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/tasks/actions";
import { getTasks, getViewState, isCreateLoading, ViewState } from "../../../redux/tasks/selectors";
import TaskFastForm from "../../../components/tasks/TaskFastForm";
import { useForm } from "react-hook-form";
import Card from "../../../components/Card";
import MyCalendar from "../../../components/MyCalendar";
import TasksService from "../../../services/tasks.service";
import moment from "moment";

const TasksPage = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const viewState = useSelector(getViewState);
    const isTaskCreateLoading = useSelector(isCreateLoading);
    const tasks = useSelector(getTasks);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [events, setEvents] = useState([]);
    const [draggedEvent, setDraggedEvent] = useState();
    const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);

    useEffect(() => {
        if (tasks !== undefined) {
            let newEvents = [];

            for (let task of tasks) {
                let endTime = new Date();
                const startTime = new Date(Date.parse(task.startTime));
                const hoursTime = task.taskComplexityInHours ? task.taskComplexityInHours * 60 * 60 * 1000 : 0;
                endTime.setTime(startTime.getTime() + hoursTime);
                let event = {
                    id: task.id,
                    start: startTime,
                    end: endTime,
                    title: task.title,
                    allDay: task.taskComplexityInHours === undefined,
                    isDraggable: task.taskStatus === "TO_DO"
                };
                newEvents.push(event);
            }

            setEvents(prevEvents => newEvents);
        }

        console.log(events);
    }, [tasks]);

    const onEventDrop = ({ event, start, end, allDay }) => {
        console.log("drag", { event, start, end, allDay });

        const hours = Math.round(Math.abs(end.getTime() - start.getTime()) / 60 / 60 / 1000) % 8;
        end.setTime(start.getTime() + hours * 60 * 60 * 1000);

        TasksService.getById(event.id).then(response => {
            const task = {
                ...response.data,
                startTime: moment(start).utc(true).toISOString(),
                taskComplexityInHours: event.allDay ? null : hours
            };
            console.log(task);
            return TasksService.update(event.id, task);
        });

        console.log(hours);
        const updatedEvent = { ...event, start, end, allDay };
        // Any other logic. If async saving your change, you'll probably
        // do the next line in a `.then()`
        setEvents((prevEvents) => {
            const filtered = prevEvents.filter((item) => item.id !== event.id);
            return [...filtered, updatedEvent];
        });
    };

    const onEventResize = ({ event, start, end, allDay }) => {
        console.log("resize", { event, start, end, allDay });

        const hours = Math.round(Math.abs(end.getTime() - start.getTime()) / 60 / 60 / 1000) % 8;
        end.setTime(start.getTime() + hours * 60 * 60 * 1000);

        TasksService.getById(event.id).then(response => {
            const task = {
                ...response.data,
                startTime: moment(start).utc(true).toISOString(),
                taskComplexityInHours: event.allDay ? null : hours
            };
            console.log(task);
            return TasksService.update(event.id, task);
        });

        const updatedEvent = { ...event, start, end, allDay };
        // Any other logic. If async saving your change, you'll probably
        // do the next line in a `.then()`
        setEvents((prevEvents) => {
            const filtered = prevEvents.filter((item) => item.id !== event.id);
            return [...filtered, updatedEvent];
        });
    };

    const eventPropGetter = useCallback(
        (event) => {
            console.log("EVENT PROP GETTER");
            console.log(events);
            return {
                ...(event.isDraggable
                    ? { className: "isDraggable" }
                    : { className: "nonDraggable" })
            };
        },
        []
    );

    const handleDragStart = useCallback((event) => setDraggedEvent(event), []);

    const dragFromOutsideItem = useCallback(() => draggedEvent, [draggedEvent]);

    const customOnDragOver = useCallback(
        (dragEvent) => {
            // check for undroppable is specific to this example
            // and not part of API. This just demonstrates that
            // onDragOver can optionally be passed to conditionally
            // allow draggable items to be dropped on cal, based on
            // whether event.preventDefault is called
            if (draggedEvent !== "undroppable") {
                console.log("preventDefault");
                dragEvent.preventDefault();
            }
        },
        [draggedEvent]
    );

    const handleDisplayDragItemInCell = useCallback(
        () => setDisplayDragItemInCell((prev) => !prev),
        []
    );

    const onDropFromOutside = useCallback(
        ({ start, end, allDay: isAllDay }) => {
            if (draggedEvent === "undroppable") {
                setDraggedEvent(null);
            }
        },
        [draggedEvent, setDraggedEvent]
    );

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
        default:
            return <div className="flex place-items-start gap-4 h-full">
                <Card>
                    <TaskFastForm
                        onSubmit={handleSubmit(onSubmit)} isLoading={isTaskCreateLoading} register={register}
                        errors={errors}/>
                    <TaskList tasks={tasks} onChangeTaskStatus={onChangeTaskStatus} onTaskDelete={onTaskDelete}/>
                </Card>
                <MyCalendar
                    events={events} onEventDrop={onEventDrop} onEventResize={onEventResize}
                    eventPropGetter={eventPropGetter} onDropFromOutside={onDropFromOutside}
                    onDragOver={customOnDragOver} dragFromOutsideItem={
                    displayDragItemInCell ? dragFromOutsideItem : null
                }/>
            </div>;
    }
};

export default TasksPage;