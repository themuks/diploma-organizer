import React, { useEffect, useState } from "react";
import MyCalendar from "../../components/MyCalendar";
import { useQuery } from "react-query";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import TasksService from "../../services/tasks.service";
import moment from "moment";

const CalendarPage = () => {
    const { isLoading, isError, data } = useQuery("tasks", async () => {
        const response = await TasksService.getAll();
        return response.data;
    });
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (data !== undefined) {
            let newEvents = [];

            for (let task of data) {
                let endTime = new Date();
                const startTime = new Date(Date.parse(task.startTime));
                const hoursTime = task.taskComplexityInHours ? task.taskComplexityInHours * 60 * 60 * 1000 : 0;
                endTime.setTime(startTime.getTime() + hoursTime);
                let event = {
                    id: task.id,
                    start: startTime,
                    end: endTime,
                    title: task.title,
                    allDay: task.taskComplexityInHours === undefined
                };
                newEvents.push(event);
            }

            setEvents(prevEvents => newEvents);
        }

        console.log(events);
    }, [data]);

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

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <Alert/>;
    } else {
        return <MyCalendar events={events} onEventDrop={onEventDrop} onEventResize={onEventResize}/>;
    }
};

export default CalendarPage;