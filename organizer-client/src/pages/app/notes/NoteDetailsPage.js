import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NotesService from "../../../services/notes.service";
import { useParams } from "react-router-dom";
import Button from "../../../components/Button";
import { useTranslation } from "react-i18next";
import SubpageLayout from "../../../components/SubpageLayout";
import ValidationErrorMessage from "../../../components/ValidationErrorMessage";

const Input = ({ label, name, type, defaultValue, register, required }) => (
    <>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
        <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type={type} defaultValue={defaultValue} {...register(name, { required })} />
    </>
);

const TextArea = ({ label, name, defaultValue, register, required }) => (
    <>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
        <textarea
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue={defaultValue} {...register(name, { required })} />
    </>
);

const NoteDetailsPage = () => {
    const { id } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { t } = useTranslation();
    const onSubmit = note => {
        console.log(note);
        NotesService.updateNote(id, note);
    };

    useEffect(() => {
        NotesService.getNote(id).then(response => {
            reset(response.data);
        });
    }, [ id ]);

    return (
        <SubpageLayout>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label={t("Title")} type="text" name="title" register={register} required/>
                {errors.title && <ValidationErrorMessage text={t("ValidationErrorRequired")}/>}
                <TextArea label={t("Text")} name="text" register={register} required/>
                {errors.text && <ValidationErrorMessage text={t("ValidationErrorRequired")}/>}
                <Button type="submit" text={t("Save")}/>
            </form>
        </SubpageLayout>
    );
};

export default NoteDetailsPage;