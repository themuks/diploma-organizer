import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useForm } from "react-hook-form";
import SettingsForm from "../components/settings/SettingsForm";
import PreferencesService from "../services/preferences.service";
import { useTranslation } from "react-i18next";

function SettingsPage() {
    const { t, i18n } = useTranslation();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isError, setIsError] = useState(false);

    const rawSetTheme = (rawTheme) => {
        const root = window.document.documentElement;
        const isDark = rawTheme === "dark";

        root.classList.remove(isDark ? "light" : "dark");
        root.classList.add(rawTheme);

        localStorage.setItem("color-theme", rawTheme);
    };

    const onSubmit = preferences => {
        setIsError(false);
        setIsSaving(true);
        PreferencesService.update(preferences).then(() => {
            i18n.changeLanguage(preferences.language === "RUSSIAN" ? "ru" : "en");
            rawSetTheme(preferences.theme === "DARK" ? "dark" : "light");
        }, () => {
            setIsError(() => true);
        }).finally(() => {
            setIsSaving(() => false);
        });
    };

    useEffect(() => {
        setIsError(false);
        setIsLoading(true);
        PreferencesService.getCurrentUserPreferences().then((response) => {
            const preferences = response.data;
            reset(preferences);
        }, () => {
            setIsError(true);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [reset]);


    return (<Modal>
        <SettingsForm
            onSubmit={handleSubmit(onSubmit)} isLoading={false} register={register}
            errors={errors}/>
    </Modal>);
}

export default SettingsPage;
