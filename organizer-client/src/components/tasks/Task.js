import React from "react";
import { FaCheck } from "react-icons/fa";
import { HiXCircle } from "react-icons/hi";

function CheckButton({ isChecked, isLoading, onClick }) {
    return <button
        className="flex items-center justify-center active:ring-2 border-2 rounded-full w-6 h-6 border-gray-800 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={onClick}>
        <div
            className={`${isChecked ? "opacity-100" : "opacity-0"} flex items-center justify-center w-6 h-6 relative active:opacity-50`}>
            <FaCheck className="w-3 h-3"/>
        </div>
    </button>;
}

const Task = ({ task, isCompleted, isLoading = false, isDeleteLoading = false, onChangeTaskStatus, onTaskDelete }) => {
    return (
        <li className={`${isCompleted ? "opacity-50" : ""} flex items-center gap-4 w-full relative box-border p-4 hover:bg-gray-100 dark:hover:bg-gray-800`} draggable="true">
            <div
                className={`${isCompleted ? "before:absolute before:block before:w-full before:border-gray-800 dark:before:border-gray-700 before:border-b-[2px] before:opacity-75" : ""} w-full relative flex flex-grow-1 items-center gap-4`}>
                <CheckButton
                    isChecked={isCompleted} isLoading={isLoading}
                    onClick={onChangeTaskStatus(task)}/>
                <p className="text-lg font-medium dark:text-gray-300">{task.title}</p>
            </div>
            <div className="flex flex-row-reverse h-full ml-auto">
                <button
                    onClick={onTaskDelete(task)}
                    className="opacity-5 hover:opacity-100 hover:text-red-700 justify-self-end"><HiXCircle/>
                </button>
            </div>
        </li>
    );
};

export default Task;