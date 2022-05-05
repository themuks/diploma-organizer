import React from "react";
import { useTranslation } from "react-i18next";
import ValidationErrorMessage from "../form/ValidationErrorMessage";
import Button from "../form/Button";
import Input from "../form/Input";
import Select from "../form/Select";


const TaskForm = ({
                      errors,
                      isNew = false,
                      isLoading: isSaving = false,
                      isDeleting = false,
                      onSubmit,
                      onDelete,
                      register
                  }) => {
    const { t, i18n } = useTranslation();

    const priorityOptions = [
        {
            value: "NO_PRIORITY",
            text: t("NoPriority")
        },
        {
            value: "LOW",
            text: t("Low")
        },
        {
            value: "MEDIUM",
            text: t("Medium")
        },
        {
            value: "HIGH",
            text: t("High")
        }
    ];

    const regularityOptions = [
        {
            value: "NOT_REGULAR",
            text: t("NotRegular")
        },
        {
            value: "EVERY_DAY",
            text: t("EveryDay")
        },
        {
            value: "EVERY_WEEK",
            text: t("EveryWeek")
        },
        {
            value: "EVERY_MONTH",
            text: t("EveryMonth")
        },
        {
            value: "EVERY_YEAR",
            text: t("EveryYear")
        }
    ];

    return (
        <form className="flex flex-col" onSubmit={onSubmit} autoComplete="off">
            <Input
                className={!errors.title ? "mb-6" : ""}
                isError={errors.title} label={t("Title")} type="text" name="title" register={register}
                placeholder={t("PleaseEnterValue", { value: t("Title").toLowerCase() })} required/>
            {errors.title && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Input
                className={!errors.description ? "mb-6" : ""}
                isError={errors.description} label={t("Description")} type="text" name="description" register={register}
                placeholder={t("PleaseEnterValue", { value: t("Description").toLowerCase() })}
            />
            {errors.description && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Input
                className={!errors.dueTime ? "mb-6" : ""}
                isError={errors.dueTime} label={t("DueDate")} type="date" name="dueTime" register={register}
                placeholder={t("PleaseEnterValue", { value: t("DueDate").toLowerCase() })}
            />
            {errors.dueTime && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Select
                className={!errors.priority
                    ? "mb-6" : ""}
                options={priorityOptions}
                isError={errors.priority} label={t("Priority")} name="priority" register={register}
                placeholder={t("PleaseEnterValue", { value: t("Priority").toLowerCase() })}
                required/>
            {errors.priority && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Select
                className={!errors.regularity
                    ? "mb-6" : ""}
                options={regularityOptions}
                isError={errors.regularity} label={t("Regularity")} name="regularity" register={register}
                placeholder={t("PleaseEnterValue", { value: t("Regularity").toLowerCase() })}
                required/>
            {errors.regularity && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                {!isNew && <Button
                    className="ml-auto"
                    color="red"
                    type="button" isLoading={isDeleting}
                    onClick={onDelete}
                    text={isDeleting
                        ? t("Deleting")
                        : t("Delete")}/>}
                <Button
                    className={isNew && "ml-auto"}
                    type="submit" isLoading={isSaving}
                    text={isNew
                        ? isSaving
                            ? t("Creating")
                            : t("Create")
                        : isSaving
                            ? t("Saving")
                            : t("Save")}/>
            </div>
        </form>);
};

export default TaskForm;