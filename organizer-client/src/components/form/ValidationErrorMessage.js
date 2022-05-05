import React from "react";
import { useTranslation } from "react-i18next";

const ValidationErrorMessage = ({ text, className, ...other }) => {
    const { t } = useTranslation();
    return (
        <p className={`${className} mt-2 text-sm text-red-600 dark:text-red-500`} {...other}><span
            className="font-medium">{t("ValidationError")}!</span> {text}.</p>
    );
};

export default ValidationErrorMessage;