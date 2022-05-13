import React from "react";
import { useTranslation } from "react-i18next";
import ValidationErrorMessage from "../form/ValidationErrorMessage";
import Button from "../form/Button";
import Select from "../form/Select";


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

    const themeOptions = [
        {
            value: "System theme",
            text: t("SystemTheme")
        },
        {
            value: "Light",
            text: t("Light")
        },
        {
            value: "Dark",
            text: t("Dark")
        }
    ];

    const languageOptions = [
        {
            value: "Default",
            text: t("Default")
        },
        {
            value: "EN",
            text: t("English")
        },
        {
            value: "RU",
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