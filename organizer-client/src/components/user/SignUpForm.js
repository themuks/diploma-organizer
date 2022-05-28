import React from "react";
import { useTranslation } from "react-i18next";
import ValidationErrorMessage from "../form/ValidationErrorMessage";
import Button from "../form/Button";
import Input from "../form/Input";
import { Link } from "react-router-dom";


const SignUpForm = ({
                        errors,
                        isSaving = false,
                        onSubmit,
                        register
                    }) => {
    const { t } = useTranslation();

    // const priorityOptions = [
    //     {
    //         value: "NO_PRIORITY",
    //         text: t("NoPriority")
    //     },
    //     {
    //         value: "LOW",
    //         text: t("Low")
    //     },
    //     {
    //         value: "MEDIUM",
    //         text: t("Medium")
    //     },
    //     {
    //         value: "HIGH",
    //         text: t("High")
    //     }
    // ];

    return (<>
        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-gray-300">{t("SignUp")}</h3>
        <form className="flex flex-col" onSubmit={onSubmit} autoComplete="off">
            <Input
                className={!errors.name ? "mb-6" : ""}
                isError={errors.name} label={t("Name")} type="text" name="name" register={register}
                placeholder={t("SignUpNamePlaceholder")} required/>
            {errors.name && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Input
                className={!errors.surname ? "mb-6" : ""}
                isError={errors.surname} label={t("Surname")} type="text" name="surname" register={register}
                placeholder={t("SignUpSurnamePlaceholder")}
            />
            {errors.surname && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Input
                className={!errors.email ? "mb-6" : ""}
                isError={errors.email} label={t("Email")} type="email" name="email" register={register}
                placeholder={t("SignUpEmailPlaceholder")} required
            />
            {errors.email && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Input
                className={!errors.password ? "mb-6" : ""}
                isError={errors.password} label={t("Password")} type="password" name="password" register={register}
                placeholder={t("SignUpPasswordPlaceholder")} required
            />
            {errors.email && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Input
                className={!errors.confirmPassword ? "mb-6" : ""}
                isError={errors.confirmPassword} label={t("ConfirmPassword")} type="password" name="confirmPassword"
                register={register}
                placeholder={t("SignUpPasswordPlaceholder")} required
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
            <Button
                className="mb-6"
                type="submit" isLoading={isSaving}
                text={t("SignUp")}/>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                {t("AlreadyHaveAccount")} <Link
                to="/login" className="text-blue-700 hover:underline dark:text-blue-500">{t("SignIn")}</Link>
            </div>
        </form>
    </>);
};

export default SignUpForm;