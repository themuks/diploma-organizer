import React from "react";
import { useTranslation } from "react-i18next";
import SubpageLayout from "../../components/SubpageLayout";

const DashboardPage = () => {
    const {t, i18n} = useTranslation();

    return (
        <SubpageLayout>
            This is dashboard
        </SubpageLayout>
    );
};

export default DashboardPage;