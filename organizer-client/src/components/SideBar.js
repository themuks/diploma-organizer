import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaCalendar, FaChartLine, FaChartPie, FaClock, FaStickyNote, FaTasks } from "react-icons/fa";

// function SideBarLink({to, children}) {
//     return <NavLink to={to}>{children}</NavLink>;
// }

function SideBarNavLink({to, text}) {
    return <NavLink to={to}
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
        {text}
    </NavLink>;
}

function SideBarNavLinkText({active, text}) {
    return <span className="flex-1 ml-3 whitespace-nowrap">{text}</span>;
}

const SideBar = () => {
    const {t, i18n} = useTranslation();

    return (
        //     <div className="flex flex-col gap-4">
        //     <SideBarLink to="tasks">Задачи</SideBarLink>
        //     <SideBarLink to="reminders">Напоминания</SideBarLink>
        //     <SideBarLink to="planning">Планирование</SideBarLink>
        //     <SideBarLink to="statistics">Статистика</SideBarLink>
        // </div>

        <aside className="w-64" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
                <ul className="space-y-2">
                    <li>
                        <SideBarNavLink to="dashboard"
                                        text={({isActive}) => (
                                            <>
                                                <FaChartPie
                                                    color={"w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"}/>
                                                <SideBarNavLinkText active={isActive} text={t("Dashboard")}/>
                                            </>
                                        )}/>
                    </li>
                    {/*<li>*/}
                    {/*    <SideBarNavLink to="/tasks" icon={<FaTasks/>} text={({isActive}) => (*/}
                    {/*        <SideBarNavLinkText active={isActive} text={t("Tasks")}/>*/}
                    {/*    )}/>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <SideBarNavLink to="/notes" icon={<FaStickyNote/>} text={({isActive}) => (*/}
                    {/*        <SideBarNavLinkText active={isActive} text={t("Notes")}/>*/}
                    {/*    )}/>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <SideBarNavLink to="/reminders" icon={<FaClock/>} text={({isActive}) => (*/}
                    {/*        <SideBarNavLinkText active={isActive} text={t("Reminders")}/>*/}
                    {/*    )}/>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <SideBarNavLink to="/calendar" icon={<FaCalendar/>} text={({isActive}) => (*/}
                    {/*        <SideBarNavLinkText active={isActive} text={t("Calendar")}/>*/}
                    {/*    )}/>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <SideBarNavLink to="/statistics" icon={<FaChartLine/>} text={({isActive}) => (*/}
                    {/*        <SideBarNavLinkText active={isActive} text={t("Statistics")}/>*/}
                    {/*    )}/>*/}
                    {/*</li>*/}
                </ul>
            </div>
        </aside>

    );
};

export default SideBar;