import React from "react";
import { useTranslation } from "react-i18next";
import ValidationErrorMessage from "../form/ValidationErrorMessage";
import Button from "../form/Button";
import Input from "../form/Input";
import { Link } from "react-router-dom";


const LoginForm = ({
                       errors,
                       isSaving = false,
                       onSubmit,
                       register
                   }) => {
    const { t } = useTranslation();

    return (<>
        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">{t("SignIn")}</h3>
        <form className="flex flex-col" onSubmit={onSubmit} autoComplete="off">
            <Input
                className={!errors.email ? "mb-6" : ""}
                isError={errors.email} label={t("Email")} type="email" name="email" register={register}
                placeholder={t("PlaceholderEmail")} required
            />
            {errors.email && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Input
                className={!errors.password ? "mb-6" : ""}
                isError={errors.password} label={t("Password")} type="password" name="password" register={register}
                placeholder={t("PlaceholderPassword")} required
            />
            {errors.password && <ValidationErrorMessage
                className="mb-6"
                text={t("ValidationErrorRequired")}/>}
            <Button
                className="mb-6"
                type="submit" isLoading={isSaving}
                text={t("LoginToYourAccount")}/>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                {t("NotRegistered")} <Link to="/signUp" className="text-blue-700 hover:underline dark:text-blue-500">{t("CreateAccount")}</Link>
            </div>
        </form>
    </>);
};

export default LoginForm;