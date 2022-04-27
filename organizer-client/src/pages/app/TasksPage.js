import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    fetch(`${process.env.REACT_APP_BACKEND_API_URL}/tasks`)
        .then(response => {
            if (response.status === 401) {
                navigate("/login");
                return;
            }

            response.json().then(data => setTasks(data));
        });

    return (
        <div className="flex flex-col gap-4 bg-red-400">
            {tasks.map(task =>
                <>
                    {task.title}
                    {task.description}
                </>
            )}
        </div>
    );
};

export default TasksPage;