import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SubpageLayout from "../../components/SubpageLayout";
import Button from "../../components/Button";

const TasksPage = () => {
    const { t, i18n } = useTranslation();
    const [ tasks, setTasks ] = useState([]);
    const navigate = useNavigate();

    return (
        <SubpageLayout>
            <Button text={t("CreateTask")}/>

            {tasks.map(task =>
                <>
                    {task.title}
                    {task.description}
                </>
            )}
        </SubpageLayout>
    );
};

export default TasksPage;