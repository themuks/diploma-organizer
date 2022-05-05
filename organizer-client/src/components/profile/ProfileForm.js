import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ValidationErrorMessage from "../form/ValidationErrorMessage";
import Button from "../form/Button";
import Input from "../form/Input";
import { useSelector } from "react-redux";


const ProfileForm = ({
                         errors,
                         isNew = false,
                         isLoading: isSaving = false,
                         onSubmit,
                         register
                     }) => {
    const { t } = useTranslation();

    return (
        <form className="flex flex-col" onSubmit={onSubmit} autoComplete="off">
            <Input
                className={!errors.name ? "mb-6" : ""}
                isError={errors.name} label={t("Name")} type="text" name="name" register={register}
                placeholder={t("PleaseEnterValue", { value: t("Name").toLowerCase() })} required/>
            {errors.name && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Input
                className={!errors.surname ? "mb-6" : ""}
                isError={errors.surname} label={t("Surname")} type="text" name="surname" register={register}
                placeholder={t("PleaseEnterValue", { value: t("Surname").toLowerCase() })}
            />
            {errors.surname && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Input
                className={!errors.email ? "mb-6" : ""}
                isError={errors.email} label={t("Email")} type="email" name="email" register={register}
                placeholder={t("PleaseEnterValue", { value: t("Email").toLowerCase() })}
            />
            {errors.email && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            {/*<Select*/}
            {/*    className={!errors.priority*/}
            {/*        ? "mb-6" : ""}*/}
            {/*    options={priorityOptions}*/}
            {/*    isError={errors.priority} label={t("Priority")} name="priority" register={register}*/}
            {/*    placeholder={t("PleaseEnterValue", { value: t("Priority").toLowerCase() })}*/}
            {/*    required/>*/}
            {/*{errors.priority && <ValidationErrorMessage*/}
            {/*    className="mb-6"*/}
            {/*    text={t("ValidationErrorRequired")}/>}*/}
            {/*<Select*/}
            {/*    className={!errors.regularity*/}
            {/*        ? "mb-6" : ""}*/}
            {/*    options={regularityOptions}*/}
            {/*    isError={errors.regularity} label={t("Regularity")} name="regularity" register={register}*/}
            {/*    placeholder={t("PleaseEnterValue", { value: t("Regularity").toLowerCase() })}*/}
            {/*    required/>*/}
            {/*{errors.regularity && <ValidationErrorMessage*/}
            {/*    className="mb-6"*/}
            {/*    text={t("ValidationErrorRequired")}/>}*/}
            <Button
                className={isNew && "ml-auto"}
                type="submit" isLoading={isSaving}
                text={isSaving
                    ? t("Saving")
                    : t("Save")}/>
        </form>);
};

export default ProfileForm;