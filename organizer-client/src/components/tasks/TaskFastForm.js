import React from "react";
import { useTranslation } from "react-i18next";
import { FaPlus, FaSpinner } from "react-icons/fa";

const TaskFastForm = ({ errors, isLoading = false, onSubmit, register }) => {
    const { t } = useTranslation();

    return (<form className="flex p-4 flex-grow-1 items-center gap-4" onSubmit={onSubmit} autoComplete="off">
        <input
            className={`${errors.title ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500"}`}
            type="text"
            placeholder={t("PleaseEnterValue", { value: t("TaskName").toLowerCase() })} {...register("title", { required: true })}></input>
        <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="submit">{isLoading ? <FaSpinner className="flex items-center justify-center w-4 h-4 animate-spin"/> :
            <FaPlus className="flex items-center justify-center w-4 h-4"/>}</button>
    </form>);
};

export default TaskFastForm;