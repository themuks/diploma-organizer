import React from "react";
import SubpageLayout from "../../components/SubpageLayout";
import Button from "../../components/form/Button";
import { useTranslation } from "react-i18next";

const RemindersPage = () => {
    const { t, i18n } = useTranslation();

    return (
        <SubpageLayout>
            <Button text={t("CreateReminder")}/>

            This is reminders page
        </SubpageLayout>
    );
};

export default RemindersPage;