import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ValidationErrorMessage from "../form/ValidationErrorMessage";
import Button from "../form/Button";
import TextArea from "../form/TextArea";
import Input from "../form/Input";
import NavBackButton from "../NavBackButton";
import moment from "moment";

const NoteForm = ({ errors, isNew = false, isLoading = false, onSubmit, onDelete, register }) => {
    const { t } = useTranslation();
    const [minDateTime, setMinDateTime] = useState(moment().toISOString().substring(0, moment().toISOString().lastIndexOf(":")));
    const [minDueDate, setMinDueDate] = useState(moment().toISOString().substring(0, moment().toISOString().lastIndexOf(":")));

    const onStartDateTimeChange = (event) => {
        console.log(event);
        setMinDueDate(event.target.value.substring(0, moment().toISOString().lastIndexOf("T")));
    };

    return (<>
        <div className="flex justify-between">
            <NavBackButton/>
        </div>
        <form className="flex flex-col" onSubmit={onSubmit} autoComplete="off">
            <Input
                className={!errors.title ? "mb-6" : ""}
                isError={errors.title} label={t("Title")} type="text" name="title" register={register} required/>
            {errors.title && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <TextArea
                className={!errors.text ? "mb-6" : ""}
                isError={errors.text} label={t("Description")} name="description" register={register}/>
            <Input
                className={!errors.startTime ? "mb-6" : ""}
                isError={errors.startTime} label={t("ReminderTime")} type="datetime-local" name="dateTime"
                register={register}
                minDate={minDateTime}
                onChange={onStartDateTimeChange}
                placeholder={t("PleaseEnterValue", { value: t("ReminderTime").toLowerCase() })}
                required
            />
            {errors.startTime && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <div className="flex flex-row-reverse gap-4">
                {!isNew && <Button
                    className="ml-auto"
                    color="red"
                    type="button" isLoading={isLoading}
                    onClick={onDelete}
                    text={isLoading
                        ? t("Deleting")
                        : t("Delete")}/>}
                <Button
                    type="submit" isLoading={isLoading}
                    text={isNew
                        ? isLoading
                            ? t("Creating")
                            : t("Create")
                        : isLoading
                            ? t("Saving")
                            : t("Save")}/>
            </div>
        </form>
    </>);
};

export default NoteForm;