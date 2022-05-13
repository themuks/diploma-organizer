import React from "react";
import { useTranslation } from "react-i18next";

const NoData = () => {
    const {t, i18n} = useTranslation();

    return (
        <div className="flex place-items-center p-4">
            <h2 className="w-full text-center">{t("NoData")}</h2>
        </div>
    );
};

export default NoData;