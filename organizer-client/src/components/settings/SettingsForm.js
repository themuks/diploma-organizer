import React from "react";
import { useTranslation } from "react-i18next";
import ValidationErrorMessage from "../form/ValidationErrorMessage";
import Button from "../form/Button";
import Select from "../form/Select";
import Input from "../form/Input";


const SettingsForm = ({
                          errors,
                          isNew = false,
                          isSaving = false,
                          onSubmit,
                          register
                      }) => {
    const { t } = useTranslation();

    const priorityOptions = [
        {
            value: "NO_GOAL",
            text: t("NoGoal")
        },
        {
            value: "DO_PRIORITIES",
            text: t("DoPriorities")
        },
        {
            value: "DO_MORE_TASKS",
            text: t("DoMoreTasks")
        }
    ];

    const themeOptions = [
        {
            value: "AUTO",
            text: t("SystemTheme")
        },
        {
            value: "LIGHT",
            text: t("Light")
        },
        {
            value: "DARK",
            text: t("Dark")
        }
    ];

    const languageOptions = [
        {
            value: "AUTO",
            text: t("Default")
        },
        {
            value: "ENGLISH",
            text: t("English")
        },
        {
            value: "RUSSIAN",
            text: t("Russian")
        }
    ];

    return (
        <form className="flex flex-col" onSubmit={onSubmit} autoComplete="off">
            <Select
                className={!errors.goal
                    ? "mb-6" : ""}
                options={priorityOptions}
                isError={errors.goal} label={t("Goal")} name="goal" register={register}
                placeholder={t("PleaseEnterValue", { value: t("Goal").toLowerCase() })}
                required/>
            {errors.goal && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Input
                className={!errors.gapBetweenTasksInMinutes ? "mb-6" : ""}
                isError={errors.gapBetweenTasksInMinutes} label={t("GapBetweenTasks")} type="number"
                name="gapBetweenTasksInMinutes" register={register}
                placeholder={t("PleaseEnterValue", { value: t("GapBetweenTasks").toLowerCase() })} required/>
            {errors.gapBetweenTasksInMinutes && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Input
                className={!errors.workStartTime ? "mb-6" : ""}
                isError={errors.workStartTime} label={t("WorkStartTime")} type="time" name="workStartTime"
                register={register}
                placeholder={t("PleaseEnterValue", { value: t("WorkStartTime").toLowerCase() })} required/>
            {errors.workStartTime && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Input
                className={!errors.workEndTime ? "mb-6" : ""}
                isError={errors.workEndTime} label={t("WorkEndTime")} type="time" name="workEndTime" register={register}
                placeholder={t("PleaseEnterValue", { value: t("WorkEndTime").toLowerCase() })} required/>
            {errors.workEndTime && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Select
                className={!errors.theme
                    ? "mb-6" : ""}
                options={themeOptions}
                isError={errors.theme} label={t("Theme")} name="theme" register={register}
                placeholder={t("PleaseEnterValue", { value: t("Theme").toLowerCase() })}
                required/>
            {errors.theme && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Select
                className={!errors.language
                    ? "mb-6" : ""}
                options={languageOptions}
                isError={errors.language} label={t("Language")} name="language" register={register}
                placeholder={t("PleaseEnterValue", { value: t("Language").toLowerCase() })}
                required/>
            {errors.language && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Button
                className={isNew && "ml-auto"}
                type="submit" isLoading={isSaving}
                text={isSaving
                    ? t("Saving")
                    : t("Save")}/>
        </form>);
};

export default SettingsForm;