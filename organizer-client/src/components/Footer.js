import React from "react";
import { useTranslation } from "react-i18next";

function Footer() {
    const {t, i18n} = useTranslation();

    return (<footer className="p-4 bg-white md:px-6 md:py-8 dark:bg-gray-800">
      <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
        © Organizer™. {t("Copyright")}.
      </span>
    </footer>);
}

export default Footer;