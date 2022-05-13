import React from "react";
import { Link, useLocation } from "react-router-dom";
import Task from "./Task";
import NoData from "../NoData";

const TaskList = ({ tasks, onChangeTaskStatus, onTaskDelete }) => {
    const location = useLocation();

    return (<ul className="flex flex-col divide-y">
        {!tasks.length && <NoData/>}
        {tasks.map(task =>
            <Link className="box-border" key={task.id} to={`${task.id}`} state={{ backgroundLocation: location }}>
                <Task task={task} isCompleted={task.taskStatus === "DONE"} onChangeTaskStatus={onChangeTaskStatus} onTaskDelete={onTaskDelete}/>
            </Link>
        )}
    </ul>);
};

export default TaskList;